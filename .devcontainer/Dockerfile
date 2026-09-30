FROM node:24-bookworm

ARG PNPM_VERSION=10.33.2
RUN apt-get update \
    && apt-get install -y --no-install-recommends sudo git openssh-client curl ca-certificates mariadb-client \
    && rm -rf /var/lib/apt/lists/* \
    && npm install -g pnpm@${PNPM_VERSION} \
    && usermod -l vscode -d /home/vscode -m node \
    && groupmod -n vscode node \
    && printf 'vscode ALL=(root) NOPASSWD:ALL\n' > /etc/sudoers.d/vscode \
    && chmod 0440 /etc/sudoers.d/vscode \
    && mkdir -p /home/vscode/.config/gh /home/vscode/.codex /home/vscode/.pnpm-store \
    && chown -R vscode:vscode /home/vscode

ENV HOME=/home/vscode
WORKDIR /workspace
USER vscode
CMD ["sleep", "infinity"]
