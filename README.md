# sails-mythic-keys

Discord bot built for World of Warcraft guild, Casual Hex, to manage Mythic keys

## Commands needed

`!default` - Manages user defaults
   - `realm` - sets the default realm for the user
   - `character` - sets the default character for `!key` and `!score` to use

`!key` - Adds key for this week's rotation

`!score` - Shows the user Raider.io score
   - `<character>` - shows the character's raider.io score

## Features needed

### Key board
    - shows the current keys for the guild
    - automatically updates on key update (!keys or astralkeys)
    - endpoint for astralkeys.lua to integrate (fluentbit?)

#### Astral Keys
    - Parse the astralkeys.lua and add guild members keys to the database

    Input methods:
        - drag 'n drop file to channel
        - email?
        - API endpoint with client? Expose?

    - need a lua parser for JS

### Score board
    - Top N Raider.io score for the current season
    - updates frequently (hourly? 15 minutes? Depends on raider.io)
    - updates on demand? Maybe with `!score update`

### Monitoring
    - Zabbix integrations?
        - number of failed commands in X time
        - bot down
    - Admin notification channel
        - error messages from the bot?
