/**
 * @author kovacsv / http://kovacsv.hu/
 * @author mrdoob / http://mrdoob.com/
 * @author mudcube / http://mudcu.be/
 * @author Mugen87 / https://github.com/Mugen87
 * @author yombo / https://github.com/yomboprime
 *
 * Modified by yombo, optimized for very large buffergeometry: Only one object, only binary. The object matrix is not applied to the geometry.
 *
 * Usage:
 *  var exporter = new STLExporterOptimized();
 *
 *  var data = exporter.parse( mesh );
 *
 *
 */

import {
	Geometry,
	Matrix3,
	Vector3
} from "../three.module.js";

var STLExporterOptimized = function () {};

STLExporterOptimized.prototype = {

	constructor: STLExporterOptimized,

	parse: ( function () {

		var p1 = new Vector3();
		var p2 = new Vector3();
		var p3 = new Vector3();
		var p12 = new Vector3();
		var p13 = new Vector3();
		var normal = new Vector3();

		return function parse( object ) {

			var geometry = object.geometry;

			if ( ! geometry.isBufferGeometry ) {

				return null;

			}

			var indices = geometry.getIndex().array;
			var vertices = geometry.attributes.position.array;

			var numTriangles = Math.floor( indices.length / 3 );

			var offset = 80; // skip header
			var bufferLength = numTriangles * 2 + numTriangles * 3 * 4 * 4 + 80 + 4;
			var arrayBuffer = new ArrayBuffer( bufferLength );
			var output = new DataView( arrayBuffer );
			output.setUint32( offset, numTriangles, true ); offset += 4;

			for ( var i = 0, il = indices.length; i < il; i += 3 ) {

				var a = 3 * indices[ i ];
				var b = 3 * indices[ i + 1 ];
				var c = 3 * indices[ i + 2 ];

				// newY = -Z; newZ = Y
				p1.set( vertices[ a ], - vertices[ a + 2 ], vertices[ a + 1 ] );
				p2.set( vertices[ b ], - vertices[ b + 2 ], vertices[ b + 1 ] );
				p3.set( vertices[ c ], - vertices[ c + 2 ], vertices[ c + 1 ] );

				p12.subVectors( p2, p1 );
				p13.subVectors( p3, p1 );
				normal.crossVectors( p12, p13 ).normalize();

				// Normal
				output.setFloat32( offset, normal.x, true ); offset += 4;
				output.setFloat32( offset, normal.y, true ); offset += 4;
				output.setFloat32( offset, normal.z, true ); offset += 4;

				// Vertices
				output.setFloat32( offset, p1.x, true ); offset += 4;
				output.setFloat32( offset, p1.y, true ); offset += 4;
				output.setFloat32( offset, p1.z, true ); offset += 4;

				output.setFloat32( offset, p2.x, true ); offset += 4;
				output.setFloat32( offset, p2.y, true ); offset += 4;
				output.setFloat32( offset, p2.z, true ); offset += 4;

				output.setFloat32( offset, p3.x, true ); offset += 4;
				output.setFloat32( offset, p3.y, true ); offset += 4;
				output.setFloat32( offset, p3.z, true ); offset += 4;

				// attribute byte count
				output.setUint16( offset, 0, true ); offset += 2;

			}

			return arrayBuffer;

		};

	}() )

};

export { STLExporterOptimized };
