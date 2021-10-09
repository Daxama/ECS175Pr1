'use strict'

import Input from "./input.js"
import Shader from "./shader.js"
import AppState from "./appstate.js"
import { HLine, Point, Square, Triangle, VLine } from "./drawables.js"

class App
{

    constructor( )
    {

        console.log( "Initializing App" )

        // canvas & gl
        this.canvas = document.getElementById( "canvas" )
        this.canvas.addEventListener( "contextmenu", event => event.preventDefault( ) );
        this.gl = this.initGl( )

        // shaders
        console.log( "Loading Shaders" )
        this.shader = new Shader( this.gl, "../shaders/vertex.glsl", "../shaders/fragment.glsl" )

        // objects
        // TODO create a structure to store your objects (points, triangles, etc.)
        this.Shapes = []

        // resize handling
        this.resizeToDisplay( )
        window.onresize = this.resizeToDisplay.bind( this )

        // app state
        this.app_state = new AppState( this )

    }

    /** 
     * Resizes canvas to pixel-size-corrected display size
     */
    resizeToDisplay( )
    {
        this.resolution = [800.0, 600.0]
        // TODO handle window resizes so that your objects scale accordingly

    }

    /**
     * Adds objects to internal data structure
     * @param { Drawable } object The object to add to your data structure
     */
    addObject( object )
    {
        this.Shapes.push(object)

        // TODO implement

    }

    /**
     * Clears scene and canvas
     */
    clearCanvas( )
    {

        // TODO implement
        this.canvas = document.getElementById('canvas') //Get a reference to the canvas element
        this.gl = canvas.getContext('webgl2') //Get a handle of on the webgl context

        if (!this.gl){
            throw Error('Could not get WebGL context!')
        }

        //Set the clear color of the canvas; white
        this.gl.clearColor(1.0, 1.0, 1.0, 1.0)

        //define the viewport
        this.gl.viewport(0, 0, 800, 600)

        //clear screen with the color defined above
        this.gl.clear(this.gl.COLOR_BUFFER_BIT)

        console.log( "Cleared scene and canvas." )

    }

    /**
     * Initializes webgl2 with settings
     * @returns { WebGL2RenderingContext | null }
     */
    initGl( )
    {

        // TODO implement

        let gl = this.canvas.getContext( "webgl2")

        if( !gl )
        {
            throw Error( "Could not initialize WebGL2.")
        }

        return gl

    }

    /**
     * Starts render loop
     */
    start( )
    {

        requestAnimationFrame( ( ) =>
        {

            this.update( )

        } )

    }

    /**
     * Called every frame, triggers input and app state update and renders a frame
     */
    update( )
    {

        this.app_state.update( )
        Input.update( )
        this.render( )
        requestAnimationFrame( ( ) =>
        {

            this.update( )

        } )

    }

    /**
     * Main render loop
     */
    render( )
    {

        // clear the screen
        this.gl.viewport( 0, 0, this.gl.canvas.width, this.gl.canvas.height )
        this.gl.clear( this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT )

        // activate the shader
        this.shader.use( )

        // TODO draw your objects here
        for(let i=0; i<this.Shapes.length; i++)
        {
            this.Shapes[i].render(this.gl, this.shader, this.resolution)
        }
    }
}

export default App
