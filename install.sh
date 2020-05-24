visudo # uncomment wheel
useradd -G wheel -m cake
systemctl set-hostname circular
# ssh-copy-id on local

sudo pacman -Syyu
sudo pacman -S base-devel tmux nginx zsh weechat nodejs git npm yarn podman --noconfirm
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
source $HOME/.cargo/env

git clone https://aur.archlinux.org/aura-bin.git
cd aura-bin && makepkg -si
cd .. && rm -rf aura-bin

sudo aura -Ax yadm --noconfirm

yadm clone git@github.com:kirjavascript/dotfiles.git

ssh-keygen -t rsa -b 4096 -C "your_email@example.com"
eval "$(ssh-agent -s)"
ssh-add ~/.ssh/id_rsa
# add to github

# user stuff
yadm clone https://github.com/kirjavascript/dotfiles
vim #disable coc
chsh -s /bin/zsh
zsh
curl -sL --proto-redir -all,https https://raw.githubusercontent.com/zplug/installer/master/installer.zsh| zsh
zplug install
git config --global user.email "snkenjoi@gmail.com"
git config --global user.name "kirjavascript"

# website
git clone https://github.com/kirjavascript/website
mv website/email email
mv website/static static
sudo mv website/nginx.conf /etc/nginx/nginx.con
rm -rf website
cd email && yarn
sudo systemctl enable nginx
sudo system start nginx

# pm2
sudo yarn global add pm2

# email
sudo setcap 'cap_net_bind_service=+ep' `which node`
pm2 start --name "email" index.js

# pasta
git clone https://github.com/kirjavascript/pastaslut
cargo build --release
pm2 start --name "eval" target/release/pastaslut

# eval
git clone https://github.com/kirjavascript/eval
echo cake:10000:65536 >> /etc/subuid # as root
echo cake:10000:65536 >> /etc/subgid # as root
sudo vim /boot/grub/grub.cfg # add cgroup_no_v1="all"
reboot
sudo pacman -S crun
cargo build --release
pm2 start --name "eval" target/release/eval

# nibblrjr
git clone https://github.com/kirjavascript/nibblrjr
yarn
pm2 start --name "nibblrjr" index.js
# copy /storage, /cache and config.json

pm2 startup
pm2 save

# DNS & certbot
