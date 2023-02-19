git config --global credential.helper store
git config --global user.email "a.pinedavegamiguel@gmail.com"
git config --global user.name "Miguel Pineda"

curl -s https://ngrok-agent.s3.amazonaws.com/ngrok.asc | tee /etc/apt/trusted.gpg.d/ngrok.asc >/dev/null \
    && echo "deb https://ngrok-agent.s3.amazonaws.com buster main" | tee /etc/apt/sources.list.d/ngrok.list \
    && apt update \
    && apt install ngrok

ngrok config add-authtoken $NGROK_TOKEN