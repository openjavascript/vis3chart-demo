

import Vis3Chart from 'vis3chart';

import fontfaceobserver from 'fontfaceobserver';

import * as common from './common.js';

import svgRateOut from './data-3d/svg/rate-out.txt';

import * as dat from 'dat.gui';

let background = [
    { 
        //"url": "./img/rate-out.png"
        "url": svgRateOut
        , "issvgstring": true
        , "width": 106
        , "height": 106
        , "offsetX": 0
        , "offsetY": 1
        , "rotation": 1
        , "rotationAttr": 'z'
        , "scaleOffset": 0.15
    }
];

//console.log( background );

let font = new fontfaceobserver( 'HuXiaoBoKuHei' );
font.load().then(function () {

    let config = {
        scene: {
            position: { x: 0, y: 0, z: 0 }
        }
        , camera: {
            position: { x: 0, y: 0, z: 0 }
        }
    }

    let gui = new dat.GUI();
    let scene = gui.addFolder( 'scene position' );
        scene.add( config.scene.position, 'x' );
        scene.add( config.scene.position, 'y' );
        scene.add( config.scene.position, 'z' );

    let camera = gui.addFolder( 'camera position' );
        camera.add( config.camera.position, 'x' );
        camera.add( config.camera.position, 'y' );
        camera.add( config.camera.position, 'z' );


    //let data = require( './data/gauge0.json' );
    //let data = require( './data/gauge.json' );
    let data = require( './data/gauge1100.json' );
        data 
        && data.series 
        && data.series.map( item => {
            item.background = background;
        });
    common.setColor( data );
        data 
        && data.series 
        && data.series.map( item => {
            item.background = background;
        });
    common.setColor( data );

    //console.log( data );

    let size = 500;

    let box = document.querySelector('#twoBox');
        
    let dmins = new Vis3Chart( box );
        dmins.updateThreeConfig( {
            camera: {
                fov: 40
            }
            , cameraPosition: {
                //z: 300
            }
        });
        dmins.update( data, true ); 
/*
    window.addEventListener( 'resize', ()=>{

        window.tmpTimeout && clearTimeout( window.tmpTimeout );

        window.tmpTimeout = setTimeout( ()=>{
            let size = Math.min( window.innerHeight, window.innerWidth ) * .6;
            dmins.resize( size, size );
        }, 1000 );
    });*/

/*
    setInterval( ()=>{
        //let data = require( './data/dount-tight8-1.json' );
        let data = require( './data/dount-tight4-1.json' );
        //let data = require( './data/dount-real1.json' );
        data 
        && data.series 
        && data.series.map( item => {
            item.background = background;
        });

        common.setColor( data );
        //dmins.resize( 500, 500, data );
        dmins.update( data );

    }, 2000 );
*/
    /*
    setTimeout( ()=>{
        //let data = require( './data/dount-tight8-1.json' );
        let data = require( './data/dount-tight4-1.json' );
        //let data = require( './data/dount-real1.json' );
        data 
        && data.series 
        && data.series.map( item => {
            item.background = background;
        });

        common.setColor( data );
        dmins.resize( 500, 500 );

    }, 3000 );

    setTimeout( ()=>{
        //let data = require( './data/dount-tight8-1.json' );
        let data = require( './data/dount-tight4-1.json' );
        //let data = require( './data/dount-real1.json' );
        data 
        && data.series 
        && data.series.map( item => {
            item.background = background;
        });

        common.setColor( data );
        dmins.update( data, true, 0 ); 

    }, 4000 );*/



}, function () {
  console.log('Font is not available');
});


