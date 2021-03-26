#!/bin/bash

export MIX_ENV=prod
export PORT=5679

CFGD=$(readlink -f ~/.config/events_spa)

if [ ! -e "$CFGD/base" ]; then
    echo "run deploy first"
    exit 1
fi

SECRET_KEY_BASE=$(cat "$CFGD/base")
export SECRET_KEY_BASE

DB_PASS=$(cat "$CFGD/db_pass")
export DATABASE_URL=ecto://events_spa:$DB_PASS@localhost/events_spa_prod

_build/prod/rel/events_spa/bin/events_spa start
