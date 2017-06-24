git stash
git branch -D gh-pages
git checkout -b gh-pages
git add -A
git commit -m "chore: publish site"
git push origin HEAD --force
git checkout master
git stash pop
echo "Site deployed"