import React from 'react';
import Clock from './Clock';

export default function Clocks(props) {
    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 12
        }}>
            {
                props.user?.searchClocks?.length === 0 ?
                    props.user?.clocks?.map((clock, i) => (
                        <Clock
                            key={clock.date}
                            clock={clock}
                            user={props.user}
                            onSetUser={props.onSetUser}
                        />
                    )) :
                    props.user?.searchClocks?.map((clock, i) => (
                        <Clock
                            key={clock.date}
                            clock={clock}
                            user={props.user}
                            onSetUser={props.onSetUser}
                        />
                    ))
            }
        </div>
    );
}