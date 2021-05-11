import React, { useRef, useState, useEffect, useCallback } from 'react';
import Button from 'react-bootstrap/Button';
import ToastNotification from '../toastNotification/toastNotification.js'
import '../wheel/wheel.css';

/*
 * Wheel renders:
 * - a canvas element that displays a fortune wheel with prizes and an indicator
 * - a button that triggers a spin animation
 * - a ToastNotification component, once a prize has been won
 * Props:
 * - items: List ( contains the items to be displayed on the wheel )
 * State:
 * - showToast: boolean ( determines if the toast should be displayed or not )
 * - prize: String ( the name of the prize )
 */
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

    /*
     * drawCircle - draws the circle based on the amount of items, with 2 alternating colors
     * and a white dot in the center. It will place the names of the items along the circle's
     * outline, each in it's own "slice".
     * Parameters:
     * - context: CanvasRenderingContext2D ( the drawing surface of the canvas )
     */
    const drawCircle = useCallback( ( context ) => { 
        const drawColors = [ "#024249", "#fa744f", "#16817a", "#f79071" ];
        const textColors = [ "#f79071", "#16817a" ];

        for( let i in wheelItems ) {
            const startAngle = Number( i ) * ( Math.PI * 2 / wheelItems.length );
            const endAngle = ( Number( i )  + 1 ) * ( Math.PI * 2 / wheelItems.length );

            context.save();

            // Draws the "slice" of the circle corresponding to the current item
            context.lineWidth = 10;
            context.beginPath();
            context.fillStyle = drawColors[ i % 2 + 2 ];
            context.moveTo( canvasSize / 2, canvasSize / 2 );        
            context.arc( canvasSize / 2, canvasSize / 2, circleRadius, startAngle, endAngle );
            context.fill();
            context.closePath();

            // Draws the outline of the "slice"
            context.beginPath();
            context.strokeStyle = drawColors[ i % 2 ];
            context.arc( canvasSize / 2, canvasSize / 2, circleRadius, startAngle, endAngle );
            context.stroke();
            context.closePath();

            // Draws a dot in the center of the circle
            context.beginPath();
            context.fillStyle = "antiquewhite";
            context.moveTo( canvasSize / 2, canvasSize / 2 );
            context.arc( canvasSize / 2, canvasSize / 2, 15, startAngle, endAngle );
            context.fill();
            
            // Draws the text ( the name of the item )
            context.font = "30px Helvetica";
            context.fillStyle = textColors[ i % 2 ];
            context.translate( canvasSize / 2, canvasSize / 2 );        
            context.rotate( startAngle + Math.PI / wheelItems.length ); 
            context.translate( circleRadius * ( 4 / 5 ), 0 );           
            context.rotate( Math.PI / 2 );                              
            context.textAlign = 'center';
            context.fillText( wheelItems[i].name, 0, 0 );

            context.restore();
        }
    }, [ wheelItems ] );

    /*
     * drawIndicator - draws the indicator on the outline of the circle, at an angle ( measured in 
     * radians ) equal to the 'rotation'.
     * Parameters:
     * - context: CanvasRenderingContext2D ( the drawing surface of the canvas )
     * - rotation: Number ( the angle in radians where the indicator will be drawn )
     */
    function drawIndicator( context, rotation ) {
        context.save();

        context.fillStyle = "antiquewhite";
        context.translate( canvasSize / 2, canvasSize / 2 );
        context.rotate( rotation );
        context.beginPath();
        context.moveTo( circleRadius - 45, 0 );
        context.lineTo( circleRadius + 5, 18 );
        context.lineTo( circleRadius + 5, -18 );
        context.fill();
        context.closePath();

        context.beginPath();
        context.arc( circleRadius + 1, 0, 12, 0, 2 * Math.PI);
        context.fill();

        context.restore();
    }

    /*
     * drawWheel - clears the canvas from any other previous drawings, then draws the circle and the
     * indicator.
     * Parameters:
     * - context: CanvasRenderingContext2D ( the drawing surface of the canvas )
     * - rotation: Number ( the angle in radians where the indicator will be drawn )
     */
    const drawWheel = useCallback( ( context, rotation ) => {
        context.clearRect( 0, 0, canvasSize, canvasSize ); 
        drawCircle( context );
        drawIndicator( context, rotation );
    }, [ drawCircle ] );

    /*
     * chooseItem - chooses an item in the given list randomly, based in its weight.
     * The weight can be seen as a predisposition of that item to be chosen.
     * Note: if the sum of all weights would be 100, they can be thought of as 
     * percentages ( but they don't need to sum up to 100 ).
     * Parameters:
     * - items: List
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

        return chosenEntry.index;
    }

    /*
     * generateSpin - generates two angles ( in radians ) determining the start and end of the
     * spin, respectively.
     * The start angle will consist of the default position ( at the top of the wheel ) plus 
     * the amount of rotations the indicator has to perform.
     * The end angle will consist of the position of the winning item's "slice" of the wheel
     * plus an offset which can range from 0 * Math.PI / wheelItems.length ( beginning of the slice )
     * to 2 * Math.PI / wheelItems.length ( end of the slice ).
     * Returns:
     * - spin: Object ( contains the spinStart: Number and the spinStop: Number )
     */
    const generateSpin = useCallback( () => {
        const random = ( min, max ) => Math.floor( Math.random() * ( max - min ) ) + min;
        const spin = {};

        // Calculating the spin start
        const fullSpins =  random( 1, 4 ) * 2;
        const startPosition = Math.PI * ( 3 / 2 );
        spin.spinStart = fullSpins * Math.PI + startPosition;

        // Calculating the spin stop
        const prizeWon = chooseItem( wheelItems );
        setPrize( wheelItems[prizeWon].name );
        const offset = ( random( 1, 200 ) / 100 ) * Math.PI / wheelItems.length;
        spin.spinStop = prizeWon * ( 2 * Math.PI / wheelItems.length ) + offset;

        return spin;
    }, [ wheelItems ] );

    /*
     * spinWheel - plays the animation of the indicator spinning around the wheel
     * until it reaches the prize. It then toggles the toast notification to show up.
     * Note: it uses an exponential function with a negative exponent in order to determine 
     * the amount to decrease from the rotation so it can simulate a smooth wheel spin animation
     *      rotation -=  Math.PI / ( 1000  * ( 1.3 ** ( -rotation ) ) );
     * Triggers: onClick of the spin-button
     */
    const spinWheel = useCallback( () => {
        // Disables previous toasts ( if any )
        setShowToast( false );
        const canvas = canvasRef.current;   
        const context = canvas.getContext( "2d" );
        const spin = generateSpin(); 

        let rotation = spin.spinStart;
        let animationFrameId;

        const render = () => {
            if ( rotation >= spin.spinStop ) {
                // What happens while the animation is playing
                drawWheel( context, rotation ); 
                spinButtonRef.current.setAttribute( "disabled", true );
                rotation -=  Math.PI / ( 1000  * ( 1.3 ** ( -rotation ) ) );
                
                animationFrameId = window.requestAnimationFrame( render );
            } else {
                // What happens after the animation has stopped
                spinButtonRef.current.removeAttribute( "disabled" );
                setShowToast( true );

                window.cancelAnimationFrame(animationFrameId);
            }
        }
        render();   

    }, [ drawWheel, generateSpin ] );   

    // Prepares the canvas and draws the wheel in the standard position.
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
                <Button className="spin-button" ref={ spinButtonRef } onClick={ spinWheel } variant="outline-warning">
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