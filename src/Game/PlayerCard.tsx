import React from 'react';

import { times } from 'lodash';

const PlayerCard = () => {

    return (
        <div
            style={{
                width: '100%',
                height: '100%',
                boxSizing: 'border-box',
                display: 'flex',
                alignContent: 'center',
                justifyContent: 'center',
                flex: 1,
                padding: '32px'
            }}
        >
            <div
                style={{
                    padding: '18px',
                    display: 'flex',
                    flexDirection: 'column',
                    flexBasis: 'start',
                    alignItems: 'center',
                    border: '1px solid #666',
                    borderRadius: '4px',
                    flex: 1,
                    marginRight: '24px'
                }}
            >
                <h2>Clues</h2>
                <div
                    style={{
                        overflow: 'scroll'
                    }}
                >
                {times(50).map(s => (
                    <div>A Clue</div>
                ))}
                </div>
            </div>
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    flexBasis: 'start',
                    flex: 1,
                }}
            >
                <div
                    style={{
                        padding: '18px',
                        border: '1px solid #666',
                        borderRadius: '4px',
                        marginBottom: '24px',
                        flex: 1,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <h2 style={{ margin: 0, marginBottom: '8px' }}>Notes</h2>
                    <textarea
                        style={{
                            fontFamily: 'arial,verdana,sans-serif',
                            border: 'none',
                            resize: 'none',
                            flex: 1,
                            width: '100%'
                        }}
                    />
                </div>
                <div
                    style={{
                        padding: '18px',
                        border: '1px solid #666',
                        borderRadius: '4px',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        flex: 1,

                    }}
                >
                    <h2>Word Unscramble</h2>
                </div>
            </div>
        </div>
    );
};

export default PlayerCard;