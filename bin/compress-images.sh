cd assets
echo "compressing images in /assets ..."
find . -name '*.png' -exec pngquant --ext .png --force 256 {} \;
echo "compression complete"