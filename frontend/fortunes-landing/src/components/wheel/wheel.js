import React, { useRef, useEffect, useCallback } from 'react';
import '../wheel/wheel.css';

function Wheel( props ) {
    // Props
    const wheelItems = props.items;

    // State


    // Refs
    const canvasRef = useRef( null );

    // Variables
    const circleRadius = 450;
    const canvasSize = 1000;

    function drawCircle( context ) {
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
            context.moveTo( canvasSize / 2, canvasSize / 2 );
            context.arc( canvasSize / 2, canvasSize / 2, circleRadius, startAngle, endAngle );
            context.stroke();

            // Adding the text
            context.translate( canvasSize / 2, canvasSize / 2 );        // Moves the context itself to the middle of the canvas
            context.rotate( startAngle + Math.PI / wheelItems.length ); // Rotates the context to the angle that would be in the middle of the current arc
            context.translate( circleRadius * ( 4 / 5 ), 0 );           // Moves the context down to 4 fifths of the radius
            context.rotate( Math.PI / 2 );                              // Rotates 90° so that the text would be written along the arc
            context.textAlign = 'center';
            context.fillText( wheelItems[i], 0, 0 );

            context.restore();
        }
    }

    function drawIndicator( context, rotation ) {
        context.save();

        context.strokeStyle = "teal";
        context.lineWidth = 30;
        context.beginPath();
        context.translate( canvasSize / 2, canvasSize / 2 );
        context.rotate( Math.PI * ( 3 / 2 ) + rotation );
        context.moveTo( circleRadius - 50, 0 );
        context.lineTo( circleRadius, 0 );
        context.stroke();

        context.restore();
    }

    const drawWheel = ( context, rotation ) => {
        context.clearRect( 0, 0, canvasSize, canvasSize ); 
        drawCircle( context );
        drawIndicator( context, rotation );
    };

    useEffect( () => {
        const canvas = canvasRef.current;   
        const context = canvas.getContext( "2d" );
    
        canvas.width = canvasSize;
        canvas.height = canvasSize;

        let animationFrameId;
        let rotation = Math.PI * 8;

        const render = () => {
            if ( rotation >= 0 ) {
                drawWheel( context, rotation ); 
            }

            // Using an exponential function with a negative exponent in order to determine the amount 
            // to decrease from the rotation so we can simulate a smooth wheel spin animation
            rotation -=  Math.PI / ( 1000  * ( 1.3 ** ( -rotation ) ) );

            animationFrameId = window.requestAnimationFrame(render);
        }
        render();

        return () => {
            window.cancelAnimationFrame(animationFrameId);
        }

    }, [drawWheel] );

    console.log( "Current Canvas: ", canvasRef.current );
    console.log( "Props:", props ); 

    return (
        <div className="wheel-container">
            <canvas ref={ canvasRef }/>
        </div>
    );
}

export default Wheel;