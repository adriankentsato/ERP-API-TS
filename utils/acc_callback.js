const Q = require('better-queue');
const uuid = require('uuid').v4;

/**
 * Accumulate data from callbacks
 * @param {number} num How many data to accumulate
 * @param {(err, result) => any} cb The callback to call when the number of data to accumulate satisfy
 * @returns 
 */
const acc_callback = ( num, cb ) => {
    const data = [];

    const queue = new Q(( { obj, cmd }, xb ) => {
        switch( cmd ) {
            case 'reset':
                // remove all data
                data.length = 0;
                xb();
                break;
            default:
                data.push( obj );

                xb();

                // Check if the length satisfies the number of accumated data to return
                if ( data.length === num ) {
                    // Check for errors added into the list.
                    const errors = data.filter( ( d ) => d instanceof Error );

                    // If no errors return all data.
                    if ( errors.length === 0 ) {
                        cb( null, data );
                    } else {
                        // if there's an error just return the first one.
                        cb( errors[0] );
                    }
                }
                break;
        }
    });

    let ctr = 0;

    return {
        accumulate: ( obj ) => {
            ctr++;

            if ( ctr > num ) {
                ctr = num;
                throw new Error('Cannot call this anymore, please call reset.');
            }

            queue.push({ id: uuid(), obj });
        },
        /**
         * Resets the accumulator, also resets the previous results' references.
         */
        reset: () => {
            ctr = 0;

            queue.push({ id: uuid(), obj: null, cmd: 'reset' });
        },
    };
};

module.exports.acc_callback = acc_callback;
