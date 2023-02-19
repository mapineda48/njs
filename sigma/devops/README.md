# Azure

### Public IP

```sh
az network public-ip list
```

### Stop

```sh
az vm deallocate --resource-group MyResourceGroupSENA1122022 --name Aprendiz
```

### Start

```sh
az vm start --resource-group MyResourceGroupSENA1122022 --name Aprendiz
```

### Group

```sh
az group create -l eastus -n MyResourceGroupSENA1122022
```

### VM

```sh
az vm create \
  --resource-group MyResourceGroupSENA1122022 \
  --name Aprendiz \
  --image UbuntuLTS \
  --admin-username azureuser \
  --ssh-key-values ~/.ssh/id_rsa.pub 
```

# Develop



# Production

## grafana.ini

```sh
bash -c "docker exec -it grafana cat /etc/grafana/grafana.ini" | tee grafana.ini
```

# Bookmarks

- https://learn.microsoft.com/es-es/azure/virtual-machines/linux/mac-create-ssh-keys
- https://grafana.com/tutorials/run-grafana-behind-a-proxy/
- https://gist.github.com/ruanbekker/c6fa9bc6882e6f324b4319c5e3622460?permalink_comment_id=3692591
- https://www.youtube.com/playlist?list=PLC-jxfv-8E7L-w6bdX61qa4ehrrgCIh4R
- https://grafana.com/grafana/dashboards/13946-docker-cadvisor/
- https://grafana.com/grafana/dashboards/13978-node-exporter-quickstart-and-dashboard/
- https://code.visualstudio.com/docs/devcontainers/create-dev-container#_use-docker-compose