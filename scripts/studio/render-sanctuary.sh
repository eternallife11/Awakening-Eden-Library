#!/usr/bin/env bash
# Awakening Eden Studio — faceless Sound Sanctuary renderer (free, ffmpeg only).
#
# Turns a few still images + one audio track into a calm, premium-feeling video:
# slow drifting zoom on each image, soft crossfades, fade in/out, loudness
# normalised to YouTube's -14 LUFS. Optional small title in the first seconds.
#
# Usage:
#   scripts/studio/render-sanctuary.sh -a audio.wav -o out.mp4 [-f 16x9|9x16] \
#       [-s 40] [-t "Morning Rain in the Food Forest"] image1.webp image2.jpg ...
#
#   -a  audio file (your own recording, CC0, or properly licensed music)
#   -o  output mp4
#   -f  16x9 (YouTube long-form, 1920x1080) or 9x16 (Shorts/Reels, 1080x1920)
#   -s  seconds each image stays on screen (default 40). Images loop until the
#       audio ends, so a 60-minute track with 6 images simply cycles them.
#   -t  optional title shown gently for the first 8 seconds
#   env PRESET=slow gives slightly smaller files at the cost of render time.
#
# Rights: only use images and sounds Benjy and Sofia own or that are licensed for
# commercial reuse. Record the source of every asset in the production's
# metadata.md (see docs/awakening-eden/studio/TEMPLATE_PRODUCTION.md).
set -euo pipefail

FORMAT=16x9; SEG=40; TITLE=""; AUDIO=""; OUT=""
while getopts "a:o:f:s:t:" opt; do
  case $opt in
    a) AUDIO=$OPTARG ;; o) OUT=$OPTARG ;; f) FORMAT=$OPTARG ;;
    s) SEG=$OPTARG ;; t) TITLE=$OPTARG ;; *) exit 2 ;;
  esac
done
shift $((OPTIND - 1))
[[ -n $AUDIO && -n $OUT && $# -ge 1 ]] || { sed -n '2,20p' "$0"; exit 2; }

case $FORMAT in
  16x9) W=1920; H=1080 ;;
  9x16) W=1080; H=1920 ;;
  *) echo "format must be 16x9 or 9x16" >&2; exit 2 ;;
esac

FPS=30; XF=4   # crossfade seconds
DUR=$(ffprobe -v error -show_entries format=duration -of csv=p=0 "$AUDIO")
DUR=${DUR%.*}; [[ $DUR -ge 1 ]] || { echo "audio too short" >&2; exit 1; }

# How many image segments are needed to cover the audio (images cycle).
STEP=$((SEG - XF))
N=$(( (DUR - XF + STEP - 1) / STEP )); [[ $N -ge 1 ]] || N=1
IMGS=("$@"); K=${#IMGS[@]}
# Long tracks: render each image once (plus image 1 again for a seamless seam)
# and loop that cycle, so a 3-hour video renders as fast as a 5-minute one.
LOOP=0
if (( N > K + 1 )); then LOOP=1; N=$((K + 1)); fi

WORK=$(mktemp -d); trap 'rm -rf "$WORK"' EXIT
FRAMES=$((SEG * FPS))

echo "Rendering ${N} segments (loop=${LOOP}) of ${SEG}s for ${DUR}s of audio at ${W}x${H}…"
for ((i = 0; i < N; i++)); do
  IMG=${IMGS[$((i % K))]}
  # Alternate gentle zoom-in / zoom-out so the motion never feels mechanical.
  if (( (i % K) % 2 == 0 )); then Z="min(1+0.08*on/${FRAMES},1.08)"; else Z="max(1.08-0.08*on/${FRAMES},1)"; fi
  ffmpeg -v error -y -loop 1 -i "$IMG" -t "$SEG" -vf \
    "scale=${W}*2:${H}*2:force_original_aspect_ratio=increase,crop=${W}*2:${H}*2,\
zoompan=z='${Z}':x='iw/2-(iw/zoom/2)':y='ih/2-(ih/zoom/2)':d=${FRAMES}:s=${W}x${H}:fps=${FPS},\
eq=saturation=1.04,format=yuv420p" \
    -c:v libx264 -preset veryfast -crf 18 "$WORK/seg$i.mp4"
done

# Chain crossfades between segments.
if (( N == 1 )); then
  cp "$WORK/seg0.mp4" "$WORK/video.mp4"
else
  INPUTS=(); FILTER=""; PREV="0:v"
  for ((i = 0; i < N; i++)); do INPUTS+=(-i "$WORK/seg$i.mp4"); done
  for ((i = 1; i < N; i++)); do
    OFF=$((i * STEP)); LBL="v$i"
    FILTER+="[${PREV}][${i}:v]xfade=transition=fade:duration=${XF}:offset=${OFF}[${LBL}];"
    PREV=$LBL
  done
  ffmpeg -v error -y "${INPUTS[@]}" -filter_complex "${FILTER%;}" -map "[${PREV}]" \
    -c:v libx264 -preset veryfast -crf 18 "$WORK/video.mp4"
fi

if (( LOOP )); then
  # Cycle runs from XF to K*STEP+XF: identical frames at both ends → seamless.
  ffmpeg -v error -y -ss "$XF" -i "$WORK/video.mp4" -t $((K * STEP)) -c:v libx264 \
    -preset veryfast -crf 18 "$WORK/cycle.mp4"
  SRC=(-stream_loop -1 -i "$WORK/cycle.mp4")
else
  SRC=(-i "$WORK/video.mp4")
fi

# Final pass: title, fades, audio loudness, trim exactly to audio length.
VF="fade=t=in:st=0:d=3,fade=t=out:st=$((DUR - 4)):d=4"
if [[ -n $TITLE ]]; then
  FONT=$(fc-match -f '%{file}' 'serif' 2>/dev/null || true)
  printf '%s' "$TITLE" > "$WORK/title.txt"
  VF="drawtext=${FONT:+fontfile=$FONT:}textfile=$WORK/title.txt:fontcolor=white:fontsize=$((H / 22)):\
x=(w-text_w)/2:y=h*0.78:shadowcolor=black@0.45:shadowx=2:shadowy=2:\
alpha='if(lt(t,1),0,if(lt(t,2),t-1,if(lt(t,7),1,if(lt(t,8),8-t,0))))',${VF}"
fi
ffmpeg -v error -y "${SRC[@]}" -i "$AUDIO" -t "$DUR" -vf "$VF" \
  -af "afade=t=in:st=0:d=3,afade=t=out:st=$((DUR - 4)):d=4,loudnorm=I=-14:TP=-1.5:LRA=11" \
  -c:v libx264 -preset "${PRESET:-veryfast}" -crf 18 -pix_fmt yuv420p -c:a aac -b:a 256k -ar 48000 \
  -movflags +faststart "$OUT"
echo "Done → $OUT"
