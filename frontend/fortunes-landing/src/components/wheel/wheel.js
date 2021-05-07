import React, { useRef, useEffect } from 'react';
import '../wheel/wheel.css';

function Wheel( props ) {
    // Props
    const wheelItems = props.items;

    // State

    // Refs
    const canvasRef = useRef( null );

    // Variables

    function drawCircle() {
        const canvas = canvasRef.current;
        const context = canvas.getContext( "2d" );

        const circleRadius = 450;
        
        canvas.width = 1000;
        canvas.height = 1000;

        // Drawing the items
        for( let i in wheelItems ) {
            const startAngle = Number( i ) * ( Math.PI * 2 / wheelItems.length );
            const endAngle = ( Number( i )  + 1 ) * ( Math.PI * 2 / wheelItems.length );
            console.log( "Angles: ", startAngle, endAngle  );

            context.save();

            context.font = "30px Arial";
            context.fillStyle = wheelItems[i];
            context.strokeStyle = wheelItems[i];
            context.lineWidth = 10;
            context.beginPath();
            // Moving the context's drawing point to the middle of the canvas
            context.moveTo( canvas.width / 2, canvas.height / 2 );
            context.arc( canvas.width / 2, canvas.height / 2, circleRadius, startAngle, endAngle );
            context.stroke();

            // Adding the text
            context.translate( canvas.width / 2, canvas.height / 2 );   // Moves the context itself to the middle of the canvas
            context.rotate( startAngle + Math.PI / wheelItems.length ); // Rotates the context to the angle that would be in the middle of the current arc
            context.translate( circleRadius * ( 4 / 5 ), 0 );  // Moves the context down to 4 fifths of the radius
            context.rotate( Math.PI / 2 );                     // Rotates 90° so that the text would be written along the arc
            context.textAlign = 'center';
            context.fillText( wheelItems[i], 0, 0 );

            context.restore();
        }
    }

    useEffect( () => {
        drawCircle();
    }, [] );

    console.log( "Current Canvas: ", canvasRef.current );
    console.log( "Props:", props ); 

    return (
        <div className="wheel-container">
            <canvas ref={ canvasRef }/>
        </div>
    );
}

export default Wheel;