while [ true ]; do
clear
git fetch --all
git reset --hard origin/main
npm i
node index.js
done
