#!/bin/bash
echo "📊 DREAM OS STATUS:"
echo -n "MariaDB:    "
service mariadb status > /dev/null 2>&1 && echo "✅" || echo "❌"
echo -n "Bridge API: "
pgrep -f "node.*bridge.js" > /dev/null && echo "✅" || echo "❌"
