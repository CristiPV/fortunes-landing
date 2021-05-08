import React, { useRef, useEffect, useCallback } from 'react';
import Button from 'react-bootstrap/Button';
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

    const drawCircle = useCallback( ( context ) => {
        // Drawing the items
        for( let i in wheelItems ) {
            const startAngle = Number( i ) * ( Math.PI * 2 / wheelItems.length );
            const endAngle = ( Number( i )  + 1 ) * ( Math.PI * 2 / wheelItems.length );
            //console.log( "Angles: ", startAngle, endAngle  );

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
    }, [ wheelItems ] );

    function drawIndicator( context, rotation ) {
        context.save();

        context.strokeStyle = "teal";
        context.lineWidth = 30;
        context.beginPath();
        context.translate( canvasSize / 2, canvasSize / 2 );
        context.rotate( rotation );
        context.moveTo( circleRadius - 50, 0 );
        context.lineTo( circleRadius, 0 );
        context.stroke();

        context.restore();
    }

    const drawWheel = useCallback( ( context, rotation ) => {
        context.clearRect( 0, 0, canvasSize, canvasSize ); 
        drawCircle( context );
        drawIndicator( context, rotation );
    }, [ drawCircle ] );

    const generateSpin = useCallback( () => {
        const random = ( min, max ) => Math.floor( Math.random() * ( max - min ) ) + min;
        const spin = {};

        // Calculating the spin start
        const fullSpins =  random( 1, 4 ) * 2;
        const startPosition = Math.PI * ( 3 / 2 )
        spin.spinStart = fullSpins * Math.PI + startPosition;

        // Calculating the spin stop
        const prizeWon = random( 0, wheelItems.length );
        // The offset can have a range of anywhere 
        // from 0 * Math.PI / wheelItems.length 
        // to 2 * Math.PI / wheelItems.length
        const offset = ( random( 1, 200 ) / 100 ) * Math.PI / wheelItems.length;
        spin.spinStop = prizeWon * ( 2 * Math.PI / wheelItems.length ) + offset;
        
        console.log( fullSpins );
        console.log( wheelItems[prizeWon] );

        return spin;
    }, [ wheelItems ] );

    const spinWheel = useCallback( () => {
        const canvas = canvasRef.current;   
        const context = canvas.getContext( "2d" );
        const spin = generateSpin();        

        let rotation = spin.spinStart;
        let animationFrameId;

        const render = () => {
            if ( rotation >= spin.spinStop ) {
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
    }, [ drawWheel, generateSpin ] );   

    // Drawing the static Wheel when the component mounts.
    useEffect( () => {
        const canvas = canvasRef.current;   
        const context = canvas.getContext( "2d" );
    
        canvas.width = canvasSize;
        canvas.height = canvasSize;

        drawWheel( context, Math.PI * ( 3 / 2 ) );
    }, [ drawWheel ] ); 

    return (
        <div className="wheel-container">
            <canvas className="border border-3 border-warning rounded-circle" ref={ canvasRef }/>
            <Button variant="warning" className="spin-button" onClick={ spinWheel }>Spin the Wheel !</Button>
        </div>
    );
}

export default Wheel;