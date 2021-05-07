while [ true ]; do
sleep 10
clear
git fetch --all
git reset --hard origin/main
node index.js
echo "Restarting..."
done
