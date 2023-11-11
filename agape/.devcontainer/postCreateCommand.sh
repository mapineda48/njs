#!/bin/bash

if [[ -v GIT_EMAIL ]] && [[ -v GIT_USER ]] && [[ -v GITHUB_USER ]] && [[ -v GITHUB_TOKEN ]]; then  
    git config --global --add safe.directory /home/njs
    
    # Configura tu nombre de usuario y correo electrónico de Git
    git config --global user.name "$GIT_USER"
    git config --global user.email "$GIT_EMAIL"


    # Configura el origen remoto, reemplaza 'tu_repositorio' con el nombre de tu repositorio
    git remote add origin https://$GITHUB_USER:$GITHUB_TOKEN@github.com/$GITHUB_USER/njs.git
fi  