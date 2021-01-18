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
        /** variable to keep track the number of rounds the game is already lasting */
          currentRound: 0,  
         
        };
    },

    computed: {
        /** Dynamic style to reduce width when an attack is launched */
        playerBarStyle() {
            return { width: this.playerHealth + '%' };
        },
        monsterBarStyle() {
            return { width: this.monsterHealth + '%' };
        },

        /** Dynamic style to disable specialAttack Button */
        disableSpecialAttack() {
            return this.currentRound % 3 !== 0;
        }

        
    },
    
    methods: {
        attackMonster() {
            /** Increase round by 1 when monster is attacked */
            this.currentRound++;
            const attackValue = getRandomValue(5, 12);
            this.monsterHealth -= attackValue; 
            /** Activate attackplayer immediately after attackmonster */
            this.attackPlayer();
        },
        
        attackPlayer() {
            const attackValue = getRandomValue(8, 15);
            this.playerHealth -= attackValue; /** Subtract generated random number from initial value */
        },

        specialAttackMonster() { /**Attack the monster specially */
            /** Increase round by 1 when monster is specially attacked  */
            this.currentRound++;
            const attackValue = getRandomValue(10, 25);
            this.monsterHealth -= attackValue;  
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
        /** Monster attack player after healing */
            this.attackPlayer();
        }


    }
});

app.mount('#game');