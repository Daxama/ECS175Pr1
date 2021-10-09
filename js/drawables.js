'use strict'

import Shader from "./shader.js"

/**
 * Base class for all drawable objects
 */
class Drawable
{

    constructor( vertices, color, primitive_type, point_size )
    {

        this.vertices = vertices
        this.vertices_buffer = null

        this.color = color

        this.primitive_type = primitive_type

        this.point_size = point_size

    }

    /**
     * Creates buffer for vertex data
     * @param { WebGL2RenderingContext } gl The webgl2 rendering context
     */
    createBuffer( gl )
    {
        // TODO create a vertex buffer and save it to this.vertices_buffer
        this.vertices_buffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, this.vertices_buffer);
        // TODO fill the vertex buffer with your vertex data
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.vertices), gl.STATIC_DRAW)
        this.vertices_buffer.itemSize = 2 //two floats per vertex (x,y)
        this.vertices_buffer.numItems = 3 //max vertices is 4, because the most used is for the square; 4 sides
    }

    /**
     * Render loop for an individual drawable
     * @param { WebGL2RenderingContext } gl The webgl2 rendering context
     * @param { Shader } shader The shader to use for rendering
     * @param { Array<Number> } resolution The current size of the canvas
     */
    render( gl, shader, resolution )
    {

        if ( this.vertices_buffer == null )
            this.createBuffer( gl )

        // TODO bind the vertex buffer to the shader
        shader.program.vertexPositionAttribute = gl.getAttribLocation(shader.program, "a_position");
        gl.enableVertexAttribArray(shader.program.vertexPositionAttribute);
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
        gl.bindBuffer(gl.ARRAY_BUFFER, this.vertices_buffer)
        gl.vertexAttribPointer(shader.program.vertexPositionAttribute, this.vertices_buffer.itemSize, gl.FLOAT, false, 0, 0)
        // TODO set uniform values 'u_color', 'u_pointSize', and 'u_resolution') in the shader using the shader.setUniform methods 
        shader.setUniform3f("u_color", this.color);
        shader.setUniform2f("u_resolution", resolution);
        shader.setUniform1f("u_pointSize", resolution[1] /100);
        // TODO call gl.drawArrays to draw your geometry
        //gl.viewport(0, 0, resolution[0], resolution[1]);
        gl.viewport(0, 0, 800, 600)
        gl.drawArrays(this.primitive_type, 0, this.vertices_buffer.numItems)
    }

}

/**
 * Point extension for drawable; calls super and then adds child specific properties
 */
class Point extends Drawable
{
    constructor(color)
    {
        super(color)
        this.vertices = [
            6, 6,
            0, 0,
            0, 0,
            0, 0
        ]
        this.primitive_type = 0x0000
    }
    // TODO implement

}

/**
 * Triangle extension for drawable; calls super and then adds child specific properties
 */
class Triangle extends Drawable
{
    constructor(vertices, color, line)
    {
        super(vertices, color)
        if(line === true)
            this.primitive_type = 0x0002
        else
            this.primitive_type = 0x0004
    }
    
    // TODO implement
}

/**
 * Square extension for Drawable; calls super and then adds child specific properties
 */
class Square extends Drawable
{
    constructor(vertices, color,line)
    {
        super(vertices, color)
        if(line === true)
            this.primitive_type = 0x0002
        else
            this.primitive_type = 0x0005
    }
    // TODO implement

}

/**
 * Line extension for Drawable; calls super and then adds child specific properties
 */
class Line extends Drawable
{

    // TODO implement

}

/**
 * Horizontal line extension for Line; calls super and then adds child specific properties
 */
class HLine extends Line
{
    constructor(vertices, color)
    {
        super(vertices, color)
        this.primitive_type = 0x0001
    }
    // TODO implement

}

/**
 * Vertical line extension for Line; calls super and then adds child specific properties
 */
class VLine extends Line
{
    constructor(vertices, color)
    {
        super(vertices, color)
        this.primitive_type = 0x0001
    }
    // TODO implement

}

export
{

    Point,
    Triangle,
    Square,
    HLine,
    VLine

}
