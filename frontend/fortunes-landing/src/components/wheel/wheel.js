import React, { useRef, useState, useEffect, useCallback } from 'react';
import Button from 'react-bootstrap/Button';
import ToastNotification from '../toastNotification/toastNotification.js'
import '../wheel/wheel.css';

function Wheel( props ) {
    // Props
    const wheelItems = props.items;

    // State
    const [showToast, setShowToast] = useState( false );
    const [prize, setPrize] = useState( "" );

    // Refs
    const canvasRef = useRef( null );
    const spinButtonRef = useRef( null );

    // Variables
    const circleRadius = 450;
    const canvasSize = 1000;

    const toggleShowToast = () => setShowToast( !showToast );

    const drawCircle = useCallback( ( context ) => {  
        // Drawing the items
        for( let i in wheelItems ) {
            const startAngle = Number( i ) * ( Math.PI * 2 / wheelItems.length );
            const endAngle = ( Number( i )  + 1 ) * ( Math.PI * 2 / wheelItems.length );
            //console.log( "Angles: ", startAngle, endAngle  );

            context.save();

            context.font = "30px Arial";
            context.fillStyle = wheelItems[i].color;
            context.strokeStyle = wheelItems[i].color;
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
            context.fillText( wheelItems[i].name, 0, 0 );

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

    /*
    Chooses an item in the given list randomly, based in its weight
    The weight can be seen as a predisposition of that item to be chosen.
    Note: if the sum of all weights would be 100, they can be thought of as 
    percentages ( but they don't need to sum up to 100 ).
    */
    function chooseItem( items ) {
        let accumulatedWeight = 0.0;
        const entries = [];

        for ( let i in items ) {
            accumulatedWeight += items[i].weight;
            entries.push( { accumulatedWeight, index: i } );
        }

        const r = Math.random() * accumulatedWeight;
        
        const chosenEntry = entries.find( ( entry ) => {
            return entry.accumulatedWeight >= r;
        } );

        // console.log( "AccumulatedWeight:", accumulatedWeight );
        // console.log( "Random * accumulatedWeight:", r );
        // console.log( "Item's accumulatedWeight:", chosenEntry.accumulatedWeight );

        return chosenEntry.index;
    }

    const generateSpin = useCallback( () => {
        const random = ( min, max ) => Math.floor( Math.random() * ( max - min ) ) + min;
        const spin = {};

        // Calculating the spin start
        const fullSpins =  random( 1, 4 ) * 2;
        const startPosition = Math.PI * ( 3 / 2 )
        spin.spinStart = fullSpins * Math.PI + startPosition;

        // Calculating the spin stop
        const prizeWon = chooseItem( wheelItems );
        setPrize( wheelItems[prizeWon].name );
        // The offset can have a range of anywhere 
        // from 0 * Math.PI / wheelItems.length 
        // to 2 * Math.PI / wheelItems.length
        const offset = ( random( 1, 200 ) / 100 ) * Math.PI / wheelItems.length;
        spin.spinStop = prizeWon * ( 2 * Math.PI / wheelItems.length ) + offset;
        
        console.log( fullSpins );
        console.log( wheelItems[prizeWon].name );

        return spin;
    }, [ wheelItems ] );

    const spinWheel = useCallback( () => {
        setShowToast( false );
        const canvas = canvasRef.current;   
        const context = canvas.getContext( "2d" );
        const spin = generateSpin(); 

        let rotation = spin.spinStart;
        let animationFrameId;

        const render = () => {
            if ( rotation >= spin.spinStop ) {
                drawWheel( context, rotation ); 
                // Disabling the spin button while the animation is playing
                spinButtonRef.current.setAttribute( "disabled", true );
                // Using an exponential function with a negative exponent in order to determine the amount 
                // to decrease from the rotation so we can simulate a smooth wheel spin animation
                rotation -=  Math.PI / ( 1000  * ( 1.3 ** ( -rotation ) ) );
                
                animationFrameId = window.requestAnimationFrame( render );
            } else {
                // Re-enabling the spin button
                spinButtonRef.current.removeAttribute( "disabled" );
                setShowToast( true );

                window.cancelAnimationFrame(animationFrameId);
            }
        }
        render();   

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
        <>
            <div className="wheel-container">
                <canvas className="border border-3 border-warning rounded-circle" ref={ canvasRef }/>
                <Button className="spin-button" ref={ spinButtonRef } onClick={ spinWheel } variant="warning">
                    Spin the Wheel !
                </Button>
            </div>
            <ToastNotification 
                title="Congratulations !"
                message={ "You won: " + prize }
                show={ showToast }
                toggleShow={ toggleShowToast }
            ></ToastNotification>
        </>
    );
}

export default Wheel;