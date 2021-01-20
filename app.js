/** JS function for calculating random number */
function getRandomValue(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

const app = Vue.createApp({
    data() {
        return {
            /**Initial value of player and monster health */
            playerHealth: 100,
            monsterHealth: 100,
            winner: null,
            /** variable to keep track the number of rounds the game is already lasting */
            currentRound: 0,
            logMessages: [],
        };
    },

    computed: {
        /** Dynamic style to reduce width when an attack is launched */
        playerBarStyle() {
            if (this.playerHealth < 0) { /** Set bar width to 0 */
                return { width: '0%' };
            }
            return { width: this.playerHealth + '%' };
        },
        monsterBarStyle() {
            if (this.monsterHealth < 0) { /** Set bar width to 0 */
                return { width: '0%' };
            }
            return { width: this.monsterHealth + '%' };
        },

        /** Dynamic style to disable specialAttack Button */
        disableSpecialAttack() {
            return this.currentRound % 3 !== 0;
        }


    },

    watch: { /** Check both players health to determine the winner and loser */
        playerHealth(value) {
            if (value <= 0 && this.monsterHealth <= 0) { //A draw
                this.winner = 'draw';
            } 
            else if (value <= 0) { //User is the loser
                this.winner = 'monster';   
            }
        },
        monsterHealth(value) {
            if (value <= 0 && this.playerHealth <= 0) { // A draw
                this.winner = 'draw';
            }
            else if (value <= 0) { //Monster is the loser
                this.winner = 'player';    
            }
            
        }
    },

    methods: {
        startGame() { /** Start a new game after a win or loss */
            this.playerHealth = 100;
            this.monsterHealth = 100;
            this.winner = null;
            this.currentRound = 0;
            this.logMessages = [];
        },

        attackMonster() {
            /** Increase round by 1 when monster is attacked and vice-versa*/
            this.currentRound++;
            const attackValue = getRandomValue(5, 12);
            this.monsterHealth -= attackValue;
        /** Store data to the log */
            this.addLogMessage('player','attack', attackValue ); /** The player attacked , + the generated random num */
            /** Activate attackplayer immediately after attackmonster */
            this.attackPlayer();
        },

        attackPlayer() {
            const attackValue = getRandomValue(8, 15);
            this.playerHealth -= attackValue; /** Subtract generated random number from initial value */
            this.addLogMessage('monster', 'attack', attackValue);
        },

        specialAttackMonster() { /**Attack the monster specially */
            /** Increase round by 1 when monster is specially attacked and activate monster to attack the user */
            this.currentRound++;
            const attackValue = getRandomValue(10, 25);
            this.monsterHealth -= attackValue;
            this.addLogMessage('player', 'attack', attackValue)
            this.attackPlayer();
        },
        healPlayer() { /**Get a heal point after being over attacked by the monster */
            this.currentRound++;
            const healValue = getRandomValue(8, 20);
            if (this.playerHealth + healValue > 100) { /** Set playerhealth to 100 if > 100 when added with healValue */
                this.playerHealth = 100;
            }

            else {
                this.playerHealth += healValue;
            }
            this.addLogMessage('player', 'heal', healValue);
            /** Monster attack player after healing */
            this.attackPlayer();
        },

        surrender() { /** Set winner to monster once the user surrender */
            this.winner = 'monster';
        },

        addLogMessage(who, what, value) { /** Who did it, what happen, whats the value */
            this.logMessages.unshift( // Unshift adds to beginning of the array
                { /** Object to monitor the logMessage */
                actionBy: who,
                actionType: what,
                actionValue: value
            }); 
        }
    }
});

app.mount('#game');