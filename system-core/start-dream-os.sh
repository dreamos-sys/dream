#!/bin/bash
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'
echo "╔════════════════════════════════════════════════════════════════╗"
echo -e "║   ${GREEN}🚀 DREAM OS STARTUP SEQUENCE${NC}                              ║"
echo "╠════════════════════════════════════════════════════════════════╣"
echo -e "║   ${BLUE}[1/3] Checking MariaDB...${NC}                                   ║"
if service mariadb status > /dev/null 2>&1; then
    echo -e "║   ${GREEN}✅ MariaDB: RUNNING${NC}                                     ║"
else
    echo -e "║   ${YELLOW}⚠️  MariaDB: Starting...${NC}                                ║"
    service mariadb start
    sleep 2
fi
echo -e "║   ${BLUE}[2/3] Checking Bridge API...${NC}                                ║"
if pgrep -f "node.*bridge.js" > /dev/null; then
    echo -e "║   ${GREEN}✅ Bridge API: RUNNING${NC}                                  ║"
else
    echo -e "║   ${YELLOW}⚠️  Bridge API: Starting...${NC}                             ║"
    cd ~
    nohup node bridge.js > ~/bridge.log 2>&1 &
    sleep 2
fi
echo -e "║   ${BLUE}[3/3] Checking Prayer Time...${NC}                               ║"
if [ -f ~/jadwal_sholat.py ]; then
    echo -e "║   ${GREEN}✅ Prayer Script: EXISTS${NC}                                ║"
    python3 ~/jadwal_sholat.py
fi
echo "╠════════════════════════════════════════════════════════════════╣"
echo -e "║   ${GREEN}🎉 DREAM OS READY${NC}                                            ║"
echo "╚════════════════════════════════════════════════════════════════╝"
