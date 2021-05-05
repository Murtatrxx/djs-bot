sleep 10
while [ true ]; do
clear
git fetch --all
git reset --hard origin/main
node index.js
done
