cd _site
git checkout -b gh-pages
git add -A
git commit -m "chore: publish site"
git push origin HEAD
git checkout master
echo "Site deployed"