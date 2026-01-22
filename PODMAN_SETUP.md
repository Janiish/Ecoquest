# Podman Installation and Setup Guide for EcoQuest

## What is Podman?

Podman is a daemonless container engine for developing, managing, and running OCI Containers. It's a drop-in replacement for Docker that doesn't require root privileges or a daemon running in the background.

## Installation

### Windows

1. **Download Podman Desktop**:
   - Visit: https://podman.io/getting-started/installation
   - Download: https://github.com/containers/podman/releases
   - Or via winget:
     ```powershell
     winget install -e --id RedHat.Podman
     ```

2. **Install Podman Desktop** (recommended):
   - Download: https://podman-desktop.io/downloads
   - Provides GUI and automatic setup

3. **Initialize Podman Machine**:
   ```powershell
   podman machine init
   podman machine start
   ```

4. **Install podman-compose** (optional, for docker-compose compatibility):
   ```powershell
   pip install podman-compose
   ```

### macOS

```bash
# Using Homebrew
brew install podman

# Initialize and start
podman machine init
podman machine start

# Install podman-compose (optional)
pip3 install podman-compose
```

### Linux

```bash
# Ubuntu/Debian
sudo apt-get update
sudo apt-get install podman

# Fedora
sudo dnf install podman

# Arch
sudo pacman -S podman

# Install podman-compose (optional)
pip install podman-compose
```

## Verify Installation

```bash
# Check Podman version
podman --version

# Check if machine is running (Windows/macOS)
podman machine list

# Test with hello-world
podman run hello-world
```

## Using with EcoQuest

The deployment scripts automatically detect Podman:

```bash
# Run deployment (automatically uses Podman if installed)
.\scripts\local-deploy.ps1
# or
./scripts/local-deploy.sh
```

## Podman vs Docker Commands

Podman is mostly compatible with Docker commands:

| Docker | Podman |
|--------|--------|
| `docker run` | `podman run` |
| `docker ps` | `podman ps` |
| `docker images` | `podman images` |
| `docker build` | `podman build` |
| `docker-compose up` | `podman-compose up` or `podman compose up` |

## Troubleshooting

### Podman Machine Not Starting (Windows/macOS)

```powershell
# Stop existing machine
podman machine stop

# Remove machine
podman machine rm

# Recreate
podman machine init --cpus 4 --memory 4096 --disk-size 50
podman machine start
```

### Port Forwarding Issues

```bash
# Check machine ports
podman machine ssh
exit

# Restart machine
podman machine restart
```

### Compose Issues

If `podman-compose` isn't working, use built-in compose:

```bash
# Instead of:
podman-compose up -d

# Use:
podman compose up -d
```

## Benefits of Podman

- ✅ **Daemonless**: No background service required
- ✅ **Rootless**: Better security, runs without root
- ✅ **Docker Compatible**: Drop-in replacement for most Docker commands
- ✅ **Kubernetes Ready**: Generates Kubernetes YAML from pods
- ✅ **Open Source**: Fully open-source project

## Resources

- Official Website: https://podman.io
- Documentation: https://docs.podman.io
- Podman Desktop: https://podman-desktop.io
- GitHub: https://github.com/containers/podman
