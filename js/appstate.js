"use strict"

import
{

    Point,
    Triangle,
    Square,
    HLine,
    VLine

}
from "./drawables.js"
import input from "./input.js"
import Input from "./input.js"
import { hex2rgb } from "./utils.js"

class AppState
{

    constructor( app )
    {

        this.app = app
        this.shp = 4
        this.color = hex2rgb("blue")
        this.vertex = [
            400, 100,
            600, 400,
            200, 400
        ];
        this.line = false
        // get list of UI indicators
        this.ui_categories = {
            "object_to_draw":
            {

                "point": document.getElementById( "pointToDraw" ),
                "triangle": document.getElementById( "triangleToDraw" ),
                "square": document.getElementById( "squareToDraw" ),
                "hLine": document.getElementById( "hLineToDraw" ),
                "vLine": document.getElementById( "vLineToDraw" ),

            },
            "color_mode":
            {

                "blue": document.getElementById( "blueColorMode" ),
                "gold": document.getElementById( "goldColorMode" )

            },
            "draw_mode":
            {

                "filled": document.getElementById( "filledDrawMode" ),
                "outline": document.getElementById( "outlineDrawMode" )

            }
        }

        // Update UI with default values
        this.updateUI( "object_to_draw", "triangle" )
        this.updateUI( "color_mode", "blue" )
        this.updateUI( "draw_mode", "filled" )
    }

    /**
     * Updates the app state by checking the input module for changes in user input
     */
    update( )
    {
        
        if(Input.isKeyPressed("p"))
        {
            this.updateUI("object_to_draw", "point");
            this.shp = 1
        }else if (Input.isKeyPressed("h")) {
            this.updateUI("object_to_draw", "hLine");
            this.shp = 2
        } else if(Input.isKeyPressed("v")){
            this.updateUI("object_to_draw", "vLine");
            this.shp = 3            
        } else if (Input.isKeyPressed("t")) {
            this.updateUI("object_to_draw", "triangle");
            this.shp = 4           
        } else if (Input.isKeyPressed("q")) {
            this.updateUI("object_to_draw", "square");
            this.shp = 5           
        } else if (Input.isKeyPressed("b")) {
            this.updateUI("color_mode", "blue");
            this.color = hex2rgb("blue")            
        } else if (Input.isKeyPressed("g")) {
            this.updateUI("color_mode", "gold");
            this.color = hex2rgb("gold")            
        } else if (Input.isKeyPressed("f")) {
            this.updateUI("draw_mode", "filled"); 
            this.line = false           
        } else if (Input.isKeyPressed("o")) {
            this.updateUI("draw_mode", "outline");
            this.line = true
        } else if (Input.isKeyPressed("c")) {
            this.app.clearCanvas();            
        }

        if(Input.isMouseClicked(0)){
            console.log("mouse was clicked")
            if(this.shp === 4){
                this.app.addObject(new Triangle(this.vertex, this.color, this.line))
            } else if(this.shp === 1)
            {
                this.app.addObject(new Point(this.vertex, this.color, this.line))
            } else if(this.shp === 2)
            {
                this.app.addObject(new HLine(this.vertex, this.color, this.line))
            } else if(this.shp === 3)
            { 
                this.app.addObject(new VLine(this.vertex, this.color, this.line))
            } else if(this.shp === 5)
            {
                this.app.addObject(new Square(this.vertex, this.color, this.line))
            }
            this.app.render()
        }
        // TODO check user input using the input module and create appropriate handlers to manipulate the canvas

        // TODO don"t forget to update the ui as seen in the constructor to tell the ui what mode you"re in

    }

    /**
     * Updates the ui to represent the current interaction
     * @param { String } category The ui category to use; see this.ui_categories for reference
     * @param { String } name The name of the item within the category
     * @param { String | null } value The value to use if the ui element is not a toggle; sets the element to given string 
     */
    updateUI( category, name, value = null )
    {

        for ( let key in this.ui_categories[ category ] )
        {

            this.updateUIElement( this.ui_categories[ category ][ key ], key == name, value )

        }

    }

    /**
     * Updates a single ui element with given state and value
     * @param { Element } el The dom element to update
     * @param { Boolean } state The state (active / inactive) to update it to
     * @param { String | null } value The value to use if the ui element is not a toggle; sets the element to given string 
     */
    updateUIElement( el, state, value )
    {

        el.classList.remove( state ? "inactive" : "active" )
        el.classList.add( state ? "active" : "inactive" )

        if ( state && value != null )
            el.innerHTML = value

    }

}

export default AppState
