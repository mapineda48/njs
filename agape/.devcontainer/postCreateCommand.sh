#!/bin/bash

if [[ -v GIT_EMAIL ]] && [[ -v GIT_NAME ]]; then  
    # Configura tu nombre de usuario y correo electrónico de Git
    git config --global user.name "$GITHUB_USER"
    git config --global user.email "$GITHUB_EMAIL"


    # Configura el origen remoto, reemplaza 'tu_repositorio' con el nombre de tu repositorio
    git remote add origin https://$GITHUB_USER:$GITHUB_TOKEN@github.com/$GITHUB_USER/njs.git
fi  