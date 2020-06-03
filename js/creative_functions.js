import {general_config, renderer, scene, camera, controls, mesh} from './initialisation.js'
import * as THREE from './three.module.js';


export function activate_animation() {
    var material;
    let uniforms= {
        color: { value: new THREE.Color( 0xffffff ) },
        pointTexture: { value: new THREE.TextureLoader().load( "../images/disc.png" ) },
        regularSize: { value: general_config.regular_size },
        u_time: { type: "f", value: 0 },
        x_factor_min: { type: "f", value: general_config.x_min_factor },
        x_factor_max: { type: "f", value: general_config.x_max_factor },
        y_factor_min: { type: "f", value: general_config.y_min_factor },
        y_factor_max: { type: "f", value: general_config.y_max_factor },
        z_factor_min: { type: "f", value: general_config.z_min_factor },
        z_factor_max: { type: "f", value: general_config.z_max_factor },
        h_factor_min: { type: "f", value: general_config.h_min_factor },
        h_factor_max: { type: "f", value: general_config.h_max_factor },
        temp_factor_min: { type: "f", value: general_config.temp_min_factor },
        temp_factor_max: { type: "f", value: general_config.temp_max_factor }
    };
    
    if(general_config.is_animated == false){
        material = new THREE.ShaderMaterial( {
            uniforms,
            vertexShader: document.getElementById( 'vertexshader_fix' ).textContent,
            fragmentShader: document.getElementById( 'fragmentshader' ).textContent,
            transparent: true
        } );
    } else if (general_config.is_animated == true){
        if(general_config.animation_parameter == 'temp'){
            material = new THREE.ShaderMaterial( {
                uniforms,
                vertexShader: document.getElementById( 'vertexshader_anim_temp' ).textContent,
                fragmentShader: document.getElementById( 'fragmentshader' ).textContent,
                transparent: true
            } );
            
        } else if(general_config.animation_parameter == 'Z'){
            material = new THREE.ShaderMaterial( {
                uniforms,
                vertexShader: document.getElementById( 'vertexshader_anim_z' ).textContent,
                fragmentShader: document.getElementById( 'fragmentshader' ).textContent,
                transparent: true
            } );
            
        }
         else if(general_config.animation_parameter == 'X'){
            material = new THREE.ShaderMaterial( {
                uniforms,
                vertexShader: document.getElementById( 'vertexshader_anim_x' ).textContent,
                fragmentShader: document.getElementById( 'fragmentshader' ).textContent,
                transparent: true
            } );
        
            
        } else if(general_config.animation_parameter == 'Y'){
            material = new THREE.ShaderMaterial( {
                uniforms,
                vertexShader: document.getElementById( 'vertexshader_anim_y' ).textContent,
                fragmentShader: document.getElementById( 'fragmentshader' ).textContent,
                transparent: true
            } );
        
        }
    }
    
    return material;
   
}
export function activate_animation_second_part(material) {
    if(general_config.grid != null){
        general_config.grid.children[0].material = material;
        
    }
    if(general_config.grid_plane != null){
        general_config.grid_plane.children[0].material = material;
    }
    recreate_scene();
    
}

export function recreate_scene() {
    let datackbx = document.querySelectorAll('.type_de_points')
    if(general_config.grid_plane == null){
    } else {
        scene.remove(general_config.grid_plane);
    }
    general_config.grid_plane = new THREE.Object3D();
    create_2D_plane_series(general_config.data_points_O_2,general_config.data_points_U_2,general_config.data_points_V_2,general_config.grid_plane,general_config.id_sbl_array_real_plane,general_config.id_meso_array_real_plane,general_config.temp_array,general_config.THAT,general_config.THAT_W,general_config.HCanopy,general_config.HCanopy_w);

	datackbx.forEach(box => {
		
		if(box.checked == true) {
			if (box.id === "data_ckbx") {
				if(general_config.grid == null){
				} else {
					scene.remove(general_config.grid);
				}
				general_config.grid = new THREE.Object3D();
				create_random_points_cloud(general_config.data_points_O_2,general_config.data_points_U_2,general_config.data_points_V_2,general_config.grid,general_config.id_sbl_array,general_config.id_meso_array,general_config.temp_array,general_config.THAT,general_config.THAT_W,general_config.HCanopy,general_config.HCanopy_w);
			} else if (box.id === "data_ckbx_real_plane_points") {
				if(general_config.grid == null){
				} else {
					scene.remove(general_config.grid);
				}
				general_config.grid = new THREE.Object3D();
				create_2D_points_cloud(general_config.data_points_O_2,general_config.data_points_U_2,general_config.data_points_V_2,general_config.grid,general_config.id_sbl_array,general_config.id_meso_array,general_config.temp_array,general_config.THAT,general_config.THAT_W,general_config.HCanopy,general_config.HCanopy_w,general_config.number_of_points_real_plane);

			} else {
				if(general_config.grid == null){
				} else {
					scene.remove(general_config.grid);
				}
				general_config.grid = new THREE.Object3D();
				create_regular_points_cloud(general_config.data_points_O_2,general_config.data_points_U_2,general_config.data_points_V_2,general_config.grid,general_config.id_sbl_array,general_config.id_meso_array,general_config.temp_array,general_config.THAT,general_config.THAT_W,general_config.HCanopy,general_config.HCanopy_w);
			}
		}
	})
}

export function create_2D_vertical_plane_series(){
	
	
}

export function create_random_points_cloud(MesoNH_O_array,MesoNH_U_array,MesoNH_V_array,grid,id_sbl_array,id_meso_array,temperature_scale,THAT,THAT_W,HCanopy,HCanopy_w){
    
    
    let tab_temp = [];
    //let tab_temp2 = general_config.temp_values;
    
    general_config.temp_values = [];
    var ni = general_config.data_ni, 
    nj = general_config.data_nj;
    
    var coord_array = [];
    var colors = [];
    var sizes = [];
    var transparency_factor_array = [];
    var custompercentagearray = [];
    var z_position_array = [];
    var x_position_array = [];
    var y_position_array = [];
    
    var h_position_array = [];
    
    general_config.z_min = null;
    general_config.z_max = null;
    general_config.x_min = null;
    general_config.x_max = null;
    general_config.y_min = null;
    general_config.y_max = null;
    
    general_config.h_min = null;
    general_config.h_max = null;
    
    for(var m=0; m<id_sbl_array.length; m++){
        for(var j=0; j<nj; j++){
            for(var i=0; i<ni; i++){
                var index_1 = j*ni + i;
                var h;
                var h_w;
                switch(id_sbl_array[m]){
                    case 1:
                        temp = MesoNH_O_array[index_1].teb_1;
                        h = HCanopy[0];
                        h_w = HCanopy_w[0];
                        break;
                    case 2:
                        temp = MesoNH_O_array[index_1].teb_2;
                        h = HCanopy[1];
                        h_w = HCanopy_w[1];
                        break;
                    case 3:
                        temp = MesoNH_O_array[index_1].teb_3;
                        h = HCanopy[2];
                        h_w = HCanopy_w[2];
                        break;
                    case 4:
                        temp = MesoNH_O_array[index_1].teb_4;
                        h = HCanopy[3];
                        h_w = HCanopy_w[3];
                        break;
                    case 5:
                        temp = MesoNH_O_array[index_1].teb_5;
                        h = HCanopy[4];
                        h_w = HCanopy_w[4];
                        break;
                    case 6:
                        temp = MesoNH_O_array[index_1].teb_6;
                        h = HCanopy[5];
                        h_w = HCanopy_w[5];
                        break;
                    default:
                        return;
                }
                // pour 'effectifs egaux', tableau temporaire
                tab_temp.push(parseFloat(temp));
                
                

                var x_o = MesoNH_O_array[index_1].x - general_config.Coord_X_paris;
                var y_o = MesoNH_O_array[index_1].y - general_config.Coord_Y_paris;					
                var z_o = MesoNH_O_array[index_1].zs + h;
                                
                var l_x = (MesoNH_O_array[index_1].x - MesoNH_U_array[index_1].x)*2;
                var l_y = (MesoNH_O_array[index_1].y - MesoNH_V_array[index_1].y)*2;
                var l_z = (h - h_w)*2;
                
                if(general_config.h_min != null && general_config.h_max != null){
                    if(h_w < general_config.h_min){
                        general_config.h_min = h_w;
                    }
                    if((h_w + l_z) > general_config.h_max){
                        general_config.h_max = (h_w + l_z);
                    }
                } else {
                    general_config.h_min = h_w;
                    general_config.h_max = (h_w + l_z);
                }
                
                if(general_config.z_min != null && general_config.z_max != null){
                    if((z_o - l_z/2) < general_config.z_min){
                        general_config.z_min = z_o - l_z/2;
                    }
                    if((z_o + l_z/2) > general_config.z_max){
                        general_config.z_max = z_o + l_z/2;
                    }
                } else {
                    general_config.z_min = z_o - l_z/2;
                    general_config.z_max = z_o + l_z/2;
                }
                
                if(general_config.x_min != null && general_config.x_max != null){
                    if((x_o - l_x/2) < general_config.x_min){
                        general_config.x_min = x_o - l_x/2;
                    }
                    if((x_o + l_x/2) > general_config.x_max){
                        general_config.x_max = x_o + l_x/2;
                    }
                } else {
                    general_config.x_min = x_o - l_x/2;
                    general_config.x_max = x_o + l_x/2;
                }
                
                if(general_config.y_min != null && general_config.y_max != null){
                    if((y_o - l_y/2) < general_config.y_min){
                        general_config.y_min = y_o - l_y/2;
                    }
                    if((y_o + l_y/2) > general_config.y_max){
                        general_config.y_max = y_o + l_y/2;
                    }
                } else {
                    general_config.y_min = y_o - l_y/2;
                    general_config.y_max = y_o + l_y/2;
                }
                
            }
        }
    }	
    

    for(var m=0; m<id_meso_array.length; m++){
        for(var j=0; j<nj; j++){
            for(var i=0; i<ni; i++){
                var index_1 = j*ni + i;
                
                var h;
                var h_w;
                switch(id_meso_array[m]){
                    case 2:
                        temp = MesoNH_O_array[index_1].tht_2;
                        h = THAT[1];
                        h_w = THAT_W[1];
                        break;
                    case 3:
                        temp = MesoNH_O_array[index_1].tht_3;
                        h = THAT[2];
                        h_w = THAT_W[2];
                        break;
                    case 4:
                        temp = MesoNH_O_array[index_1].tht_4;
                        h = THAT[3];
                        h_w = THAT_W[3];
                        break;
                    case 5:
                        temp = MesoNH_O_array[index_1].tht_5;
                        h = THAT[4];
                        h_w = THAT_W[4];
                        break;
                    case 6:
                        temp = MesoNH_O_array[index_1].tht_6;
                        h = THAT[5];
                        h_w = THAT_W[5];
                        break;
                    case 7:
                        temp = MesoNH_O_array[index_1].tht_7;
                        h = THAT[6];
                        h_w = THAT_W[6];
                        break;
                    case 8:
                        temp = MesoNH_O_array[index_1].tht_8;
                        h = THAT[7];
                        h_w = THAT_W[7];
                        break;
                    case 9:
                        temp = MesoNH_O_array[index_1].tht_9;
                        h = THAT[8];
                        h_w = THAT_W[8];
                        break;
                    case 10:
                        temp = MesoNH_O_array[index_1].tht_10;
                        h = THAT[9];
                        h_w = THAT_W[9];
                        break;
                    case 11:
                        temp = MesoNH_O_array[index_1].tht_11;
                        h = THAT[10];
                        h_w = THAT_W[10];
                        break;
                    case 12:
                        temp = MesoNH_O_array[index_1].tht_12;
                        h = THAT[11];
                        h_w = THAT_W[11];
                        break;
                    case 13:
                        temp = MesoNH_O_array[index_1].tht_13;
                        h = THAT[12];
                        h_w = THAT_W[12];
                        break;
                    case 14:
                        temp = MesoNH_O_array[index_1].tht_14;
                        h = THAT[13];
                        h_w = THAT_W[13];
                        break;
                    case 15:
                        temp = MesoNH_O_array[index_1].tht_15;
                        h = THAT[14];
                        h_w = THAT_W[14];
                        break;
                    case 16:
                        temp = MesoNH_O_array[index_1].tht_16;
                        h = THAT[15];
                        h_w = THAT_W[15];
                        break;
                    case 17:
                        temp = MesoNH_O_array[index_1].tht_17;
                        h = THAT[16];
                        h_w = THAT_W[16];
                        break;
                    case 18:
                        temp = MesoNH_O_array[index_1].tht_18;
                        h = THAT[17];
                        h_w = THAT_W[17];
                        break;
                    case 19:
                        temp = MesoNH_O_array[index_1].tht_19;
                        h = THAT[18];
                        h_w = THAT_W[18];
                        break;
                    case 20:
                        temp = MesoNH_O_array[index_1].tht_20;
                        h = THAT[19];
                        h_w = THAT_W[19];
                        break;
                    case 21:
                        temp = MesoNH_O_array[index_1].tht_21;
                        h = THAT[20];
                        h_w = THAT_W[20];
                        break;
                    case 22:
                        temp = MesoNH_O_array[index_1].tht_22;
                        h = THAT[21];
                        h_w = THAT_W[21];
                        break;
                    case 23:
                        temp = MesoNH_O_array[index_1].tht_23;
                        h = THAT[22];
                        h_w = THAT_W[22];
                        break;
                    case 24:
                        temp = MesoNH_O_array[index_1].tht_24;
                        h = THAT[23];
                        h_w = THAT_W[23];
                        break;
                    case 25:
                        temp = MesoNH_O_array[index_1].tht_25;
                        h = THAT[24];
                        h_w = THAT_W[24];
                        break;
                    case 26:
                        temp = MesoNH_O_array[index_1].tht_26;
                        h = THAT[25];
                        h_w = THAT_W[25];
                        break;
                    case 27:
                        temp = MesoNH_O_array[index_1].tht_27;
                        h = THAT[26];
                        h_w = THAT_W[26];
                        break;
                    case 28:
                        temp = MesoNH_O_array[index_1].tht_28;
                        h = THAT[27];
                        h_w = THAT_W[27];
                        break;
                    case 29:
                        temp = MesoNH_O_array[index_1].tht_29;
                        h = THAT[28];
                        h_w = THAT_W[28];
                        break;
                    case 30:
                        temp = MesoNH_O_array[index_1].tht_30;
                        h = THAT[29];
                        h_w = THAT_W[29];
                        break;
                    case 31:
                        temp = MesoNH_O_array[index_1].tht_31;
                        h = THAT[30];
                        h_w = THAT_W[30];
                        break;
                    case 32:
                        temp = MesoNH_O_array[index_1].tht_32;
                        h = THAT[31];
                        h_w = THAT_W[31];
                        break;
                    default:
                        return;
                }
                 // pour 'effectifs egaux', tableau temporaire
                 tab_temp.push(parseFloat(temp));
                               

                var x_o = MesoNH_O_array[index_1].x - general_config.Coord_X_paris;
                var y_o = MesoNH_O_array[index_1].y - general_config.Coord_Y_paris;					
                var z_o = MesoNH_O_array[index_1].zs + h;
                
                var l_x = (MesoNH_O_array[index_1].x - MesoNH_U_array[index_1].x)*2;
                var l_y = (MesoNH_O_array[index_1].y - MesoNH_V_array[index_1].y)*2;
                var l_z = (h-h_w)*2;
                                
                if(general_config.h_min != null && general_config.h_max != null){
                    if(h_w < general_config.h_min){
                        general_config.h_min = h_w;
                    }
                    if((h_w + l_z) > general_config.h_max){
                        general_config.h_max = (h_w + l_z);
                    }
                } else {
                    general_config.h_min = h_w;
                    general_config.h_max = (h_w + l_z);
                }
                    
                if(general_config.z_min != null && general_config.z_max != null){
                    if((z_o - l_z/2) < general_config.z_min){
                        general_config.z_min = z_o - l_z/2;
                    }
                    if((z_o + l_z/2) > general_config.z_max){
                        general_config.z_max = z_o + l_z/2;
                    }
                } else {
                    general_config.z_min = z_o - l_z/2;
                    general_config.z_max = z_o + l_z/2;
                }
                
                if(general_config.x_min != null && general_config.x_max != null){
                    if((x_o - l_x/2) < general_config.x_min){
                        general_config.x_min = x_o - l_x/2;
                    }
                    if((x_o + l_x/2) > general_config.x_max){
                        general_config.x_max = x_o + l_x/2;
                    }
                } else {
                    general_config.x_min = x_o - l_x/2;
                    general_config.x_max = x_o + l_x/2;
                }
                
                if(general_config.y_min != null && general_config.y_max != null){
                    if((y_o - l_y/2) < general_config.y_min){
                        general_config.y_min = y_o - l_y/2;
                    }
                    if((y_o + l_y/2) > general_config.y_max){
                        general_config.y_max = y_o + l_y/2;
                    }
                } else {
                    general_config.y_min = y_o - l_y/2;
                    general_config.y_max = y_o + l_y/2;
                }
            
                
            }
        }
    }
    /*
    $.each(tab_temp2, function(i, el){
        if($.inArray(el, tab_temp) === -1) tab_temp.push(parseFloat(el));
    });*/
    tab_temp.sort((a,b) => a-b)

    for(var m=0; m<id_sbl_array.length; m++){
        for(var j=0; j<nj; j++){
            for(var i=0; i<ni; i++){
                var index_1 = j*ni + i;
                var temp;
                var h;
                var h_w;
                switch(id_sbl_array[m]){
                    case 1:
                        temp = MesoNH_O_array[index_1].teb_1;
                        h = HCanopy[0];
                        h_w = HCanopy_w[0];
                        break;
                    case 2:
                        temp = MesoNH_O_array[index_1].teb_2;
                        h = HCanopy[1];
                        h_w = HCanopy_w[1];
                        break;
                    case 3:
                        temp = MesoNH_O_array[index_1].teb_3;
                        h = HCanopy[2];
                        h_w = HCanopy_w[2];
                        break;
                    case 4:
                        temp = MesoNH_O_array[index_1].teb_4;
                        h = HCanopy[3];
                        h_w = HCanopy_w[3];
                        break;
                    case 5:
                        temp = MesoNH_O_array[index_1].teb_5;
                        h = HCanopy[4];
                        h_w = HCanopy_w[4];
                        break;
                    case 6:
                        temp = MesoNH_O_array[index_1].teb_6;
                        h = HCanopy[5];
                        h_w = HCanopy_w[5];
                        break;
                    default:
                        return;
                }
                
                
                var x_o = MesoNH_O_array[index_1].x - general_config.Coord_X_paris;
                var y_o = MesoNH_O_array[index_1].y - general_config.Coord_Y_paris;					
                var z_o = MesoNH_O_array[index_1].zs + h;
                                
                var l_x = (MesoNH_O_array[index_1].x - MesoNH_U_array[index_1].x)*2;
                var l_y = (MesoNH_O_array[index_1].y - MesoNH_V_array[index_1].y)*2;
                var l_z = (h - h_w)*2;
                
                                                
                var tmin = temperature_scale[0];
                var tmax = temperature_scale[1];
                var percentage_color = (temp - tmin)/(tmax - tmin);
                if(percentage_color<0){
                    percentage_color = 0;
                } else if(percentage_color >1){
                    percentage_color = 1;
                }
                
                
                general_config.temp_values.push(parseFloat(temp));
                var color_hex = getHCLcolor(tab_temp, temp, percentage_color,general_config.HCL_color_scales[general_config.active_HCL_id].scale);
                
                var color_rgb = hexToRgb(color_hex)
                
                var color_r = color_rgb.r/255;
                var color_g = color_rgb.g/255;
                var color_b = color_rgb.b/255;
                    
                var cell_volume = l_x*l_y*l_z;
                
                var relative_density;
                
                if(general_config.relative_density_factor < 1){
                    var add_factor = 1-general_config.relative_density_factor;
                    if(percentage_color < 0.5){
                        relative_density = general_config.particle_density + general_config.particle_density*add_factor*(0.5-percentage_color)*2;
                    } else if(percentage_color == 0.5){
                        relative_density = general_config.particle_density;
                    } else if(percentage_color > 0.5){
                        relative_density = general_config.particle_density - general_config.particle_density*add_factor*(percentage_color-0.5)*2;
                    }
                } else if(general_config.relative_density_factor == 1){
                    relative_density = general_config.particle_density;
                } else if(general_config.relative_density_factor >1){
                    var add_factor = general_config.relative_density_factor-1;
                    if(percentage_color < 0.5){
                        relative_density = general_config.particle_density - general_config.particle_density*add_factor*(0.5-percentage_color)*2;
                    } else if(percentage_color == 0.5){
                        relative_density = general_config.particle_density;
                    } else if(percentage_color > 0.5){
                        relative_density = general_config.particle_density + general_config.particle_density*add_factor*(percentage_color-0.5)*2;
                    }
                }
                
                var particle_length = parseInt(relative_density*cell_volume);
                
                var size;
                var basic_size = 10000;
                
                if(general_config.relative_size_factor < 1){
                    var add_factor = 1-general_config.relative_size_factor;
                    if(percentage_color < 0.5){
                        size = parseInt(basic_size + basic_size*add_factor*(0.5-percentage_color)*2);
                    } else if(percentage_color == 0.5){
                        size = basic_size;
                    } else if(percentage_color > 0.5){
                        size = parseInt(basic_size - basic_size*add_factor*(percentage_color-0.5)*2);
                    }
                } else if(general_config.relative_size_factor == 1){
                    size = basic_size;
                } else if(general_config.relative_size_factor >1){
                    var add_factor = general_config.relative_size_factor-1;
                    if(percentage_color < 0.5){
                        size = parseInt(basic_size - basic_size*add_factor*(0.5-percentage_color)*2);
                    } else if(percentage_color == 0.5){
                        size = basic_size;
                    } else if(percentage_color > 0.5){
                        size = parseInt(basic_size + basic_size*add_factor*(percentage_color-0.5)*2);
                    }
                }
                                        
                for(var p =0; p< particle_length; p++){
                    var pX = (Math.random()-0.5)*2 * (l_x/2) + x_o,
                     pY = (Math.random()-0.5)*2 * (l_y/2) + y_o,
                     pZ = (Math.random()-0.5)*2 * (l_z/2) + z_o;
                    coord_array.push(pX*general_config.cst_X);
                    coord_array.push(pZ*general_config.cst_Z);
                    coord_array.push(-pY*general_config.cst_Y);
                    colors.push(color_r);colors.push(color_g);colors.push(color_b);
                    sizes.push(size);
                    transparency_factor_array.push(general_config.transparency_factor);
                    custompercentagearray.push(percentage_color*2*Math.PI);
                    z_position_array.push((pZ - general_config.z_min)/(general_config.z_max - general_config.z_min));
                    x_position_array.push((pX - general_config.x_min)/(general_config.x_max - general_config.x_min));
                    y_position_array.push((pY - general_config.y_min)/(general_config.y_max - general_config.y_min));
                    h_position_array.push(((pZ-MesoNH_O_array[index_1].zs)-general_config.h_min)/(general_config.h_max - general_config.h_min));
                }
            }
        }
    }	
    

    for(var m=0; m<id_meso_array.length; m++){
        for(var j=0; j<nj; j++){
            for(var i=0; i<ni; i++){
                var index_1 = j*ni + i;
                
                var temp;
                var h;
                var h_w;
                switch(id_meso_array[m]){
                    case 2:
                        temp = MesoNH_O_array[index_1].tht_2;
                        h = THAT[1];
                        h_w = THAT_W[1];
                        break;
                    case 3:
                        temp = MesoNH_O_array[index_1].tht_3;
                        h = THAT[2];
                        h_w = THAT_W[2];
                        break;
                    case 4:
                        temp = MesoNH_O_array[index_1].tht_4;
                        h = THAT[3];
                        h_w = THAT_W[3];
                        break;
                    case 5:
                        temp = MesoNH_O_array[index_1].tht_5;
                        h = THAT[4];
                        h_w = THAT_W[4];
                        break;
                    case 6:
                        temp = MesoNH_O_array[index_1].tht_6;
                        h = THAT[5];
                        h_w = THAT_W[5];
                        break;
                    case 7:
                        temp = MesoNH_O_array[index_1].tht_7;
                        h = THAT[6];
                        h_w = THAT_W[6];
                        break;
                    case 8:
                        temp = MesoNH_O_array[index_1].tht_8;
                        h = THAT[7];
                        h_w = THAT_W[7];
                        break;
                    case 9:
                        temp = MesoNH_O_array[index_1].tht_9;
                        h = THAT[8];
                        h_w = THAT_W[8];
                        break;
                    case 10:
                        temp = MesoNH_O_array[index_1].tht_10;
                        h = THAT[9];
                        h_w = THAT_W[9];
                        break;
                    case 11:
                        temp = MesoNH_O_array[index_1].tht_11;
                        h = THAT[10];
                        h_w = THAT_W[10];
                        break;
                    case 12:
                        temp = MesoNH_O_array[index_1].tht_12;
                        h = THAT[11];
                        h_w = THAT_W[11];
                        break;
                    case 13:
                        temp = MesoNH_O_array[index_1].tht_13;
                        h = THAT[12];
                        h_w = THAT_W[12];
                        break;
                    case 14:
                        temp = MesoNH_O_array[index_1].tht_14;
                        h = THAT[13];
                        h_w = THAT_W[13];
                        break;
                    case 15:
                        temp = MesoNH_O_array[index_1].tht_15;
                        h = THAT[14];
                        h_w = THAT_W[14];
                        break;
                    case 16:
                        temp = MesoNH_O_array[index_1].tht_16;
                        h = THAT[15];
                        h_w = THAT_W[15];
                        break;
                    case 17:
                        temp = MesoNH_O_array[index_1].tht_17;
                        h = THAT[16];
                        h_w = THAT_W[16];
                        break;
                    case 18:
                        temp = MesoNH_O_array[index_1].tht_18;
                        h = THAT[17];
                        h_w = THAT_W[17];
                        break;
                    case 19:
                        temp = MesoNH_O_array[index_1].tht_19;
                        h = THAT[18];
                        h_w = THAT_W[18];
                        break;
                    case 20:
                        temp = MesoNH_O_array[index_1].tht_20;
                        h = THAT[19];
                        h_w = THAT_W[19];
                        break;
                    case 21:
                        temp = MesoNH_O_array[index_1].tht_21;
                        h = THAT[20];
                        h_w = THAT_W[20];
                        break;
                    case 22:
                        temp = MesoNH_O_array[index_1].tht_22;
                        h = THAT[21];
                        h_w = THAT_W[21];
                        break;
                    case 23:
                        temp = MesoNH_O_array[index_1].tht_23;
                        h = THAT[22];
                        h_w = THAT_W[22];
                        break;
                    case 24:
                        temp = MesoNH_O_array[index_1].tht_24;
                        h = THAT[23];
                        h_w = THAT_W[23];
                        break;
                    case 25:
                        temp = MesoNH_O_array[index_1].tht_25;
                        h = THAT[24];
                        h_w = THAT_W[24];
                        break;
                    case 26:
                        temp = MesoNH_O_array[index_1].tht_26;
                        h = THAT[25];
                        h_w = THAT_W[25];
                        break;
                    case 27:
                        temp = MesoNH_O_array[index_1].tht_27;
                        h = THAT[26];
                        h_w = THAT_W[26];
                        break;
                    case 28:
                        temp = MesoNH_O_array[index_1].tht_28;
                        h = THAT[27];
                        h_w = THAT_W[27];
                        break;
                    case 29:
                        temp = MesoNH_O_array[index_1].tht_29;
                        h = THAT[28];
                        h_w = THAT_W[28];
                        break;
                    case 30:
                        temp = MesoNH_O_array[index_1].tht_30;
                        h = THAT[29];
                        h_w = THAT_W[29];
                        break;
                    case 31:
                        temp = MesoNH_O_array[index_1].tht_31;
                        h = THAT[30];
                        h_w = THAT_W[30];
                        break;
                    case 32:
                        temp = MesoNH_O_array[index_1].tht_32;
                        h = THAT[31];
                        h_w = THAT_W[31];
                        break;
                    default:
                        return;
                }
                                                
                var x_o = MesoNH_O_array[index_1].x - general_config.Coord_X_paris;
                var y_o = MesoNH_O_array[index_1].y - general_config.Coord_Y_paris;					
                var z_o = MesoNH_O_array[index_1].zs + h;
                
                var l_x = (MesoNH_O_array[index_1].x - MesoNH_U_array[index_1].x)*2;
                var l_y = (MesoNH_O_array[index_1].y - MesoNH_V_array[index_1].y)*2;
                var l_z = (h-h_w)*2;
                                
                                
                var tmin = temperature_scale[0];
                var tmax = temperature_scale[1];
                var percentage_color = (temp - tmin)/(tmax - tmin);
                if(percentage_color<0){
                    percentage_color = 0;
                } else if(percentage_color >1){
                    percentage_color = 1;
                }
                                    
                general_config.temp_values.push(parseFloat(temp));
                var color_hex = getHCLcolor(tab_temp, temp, percentage_color,general_config.HCL_color_scales[general_config.active_HCL_id].scale);
                                     
                
                var color_rgb = hexToRgb(color_hex);
               
                var color_r = color_rgb.r/255;
                var color_g = color_rgb.g/255;
                var color_b = color_rgb.b/255;
                    
                var cell_volume = l_x*l_y*l_z;
                
                var relative_density;
                
                if(general_config.relative_density_factor < 1){
                    var add_factor = 1-general_config.relative_density_factor;
                    if(percentage_color < 0.5){
                        relative_density = general_config.particle_density + general_config.particle_density*add_factor*(0.5-percentage_color)*2;
                    } else if(percentage_color == 0.5){
                        relative_density = general_config.particle_density;
                    } else if(percentage_color > 0.5){
                        relative_density = general_config.particle_density - general_config.particle_density*add_factor*(percentage_color-0.5)*2;
                    }
                } else if(general_config.relative_density_factor == 1){
                    relative_density = general_config.particle_density;
                } else if(general_config.relative_density_factor >1){
                    var add_factor = general_config.relative_density_factor-1;
                    if(percentage_color < 0.5){
                        relative_density = general_config.particle_density - general_config.particle_density*add_factor*(0.5-percentage_color)*2;
                    } else if(percentage_color == 0.5){
                        relative_density = general_config.particle_density;
                    } else if(percentage_color > 0.5){
                        relative_density = general_config.particle_density + general_config.particle_density*add_factor*(percentage_color-0.5)*2;
                    }
                }
                
                
                var particle_length = parseInt(relative_density*cell_volume);
                
                var size;
                var basic_size = 10000;
                
                if(general_config.relative_size_factor < 1){
                    var add_factor = 1-general_config.relative_size_factor;
                    if(percentage_color < 0.5){
                        size = parseInt(basic_size + basic_size*add_factor*(0.5-percentage_color)*2);
                    } else if(percentage_color == 0.5){
                        size = basic_size;
                    } else if(percentage_color > 0.5){
                        size = parseInt(basic_size - basic_size*add_factor*(percentage_color-0.5)*2);
                    }
                } else if(general_config.relative_size_factor == 1){
                    size = basic_size;
                } else if(general_config.relative_size_factor >1){
                    var add_factor = general_config.relative_size_factor-1;
                    if(percentage_color < 0.5){
                        size = parseInt(basic_size - basic_size*add_factor*(0.5-percentage_color)*2);
                    } else if(percentage_color == 0.5){
                        size = basic_size;
                    } else if(percentage_color > 0.5){
                        size = parseInt(basic_size + basic_size*add_factor*(percentage_color-0.5)*2);
                    }
                }
                    
                for(var p =0; p< particle_length; p++){
                    var pX = (Math.random()-0.5)*2 * (l_x/2) + x_o,
                      pY = (Math.random()-0.5)*2 * (l_y/2) + y_o,
                      pZ = (Math.random()-0.5)*2 * (l_z/2) + z_o;
                    coord_array.push(pX*general_config.cst_X);
                    coord_array.push(pZ*general_config.cst_Z);
                    coord_array.push(-pY*general_config.cst_Y);
                    colors.push(color_r);colors.push(color_g);colors.push(color_b);
                    sizes.push(size);
                    transparency_factor_array.push(general_config.transparency_factor);
                    custompercentagearray.push(percentage_color*2*Math.PI);
                    z_position_array.push((pZ - general_config.z_min)/(general_config.z_max - general_config.z_min));
                    x_position_array.push((pX - general_config.x_min)/(general_config.x_max - general_config.x_min));
                    y_position_array.push((pY - general_config.y_min)/(general_config.y_max - general_config.y_min));
                    h_position_array.push(((pZ-MesoNH_O_array[index_1].zs)-general_config.h_min)/(general_config.h_max - general_config.h_min));
                }
                
            }
        }
    }	
           
    
    var coord_array_32 = new Float32Array(coord_array);
    var colors_32 = new Float32Array(colors);  
    var sizes_32 = new Float32Array(sizes);
    var transparency_factor_32 = new Float32Array(transparency_factor_array);
    var custompercentage_32 = new Float32Array(custompercentagearray);
    var z_position_array_32 = new Float32Array(z_position_array);
    var x_position_array_32 = new Float32Array(x_position_array);
    var y_position_array_32 = new Float32Array(y_position_array);
    var h_position_array_32 = new Float32Array(h_position_array);
    
    
    var bufferGeometry = new THREE.BufferGeometry();
    
    bufferGeometry.setAttribute( 'position', new THREE.BufferAttribute( coord_array_32, 3 ) );
    bufferGeometry.setAttribute( 'customColor', new THREE.BufferAttribute( colors_32, 3 ) );
    bufferGeometry.setAttribute( 'customsize', new THREE.BufferAttribute(sizes_32,1));
    bufferGeometry.setAttribute( 'customtransparency', new THREE.BufferAttribute(transparency_factor_32,1));
    bufferGeometry.setAttribute( 'custompercentage', new THREE.BufferAttribute(custompercentage_32,1));
    bufferGeometry.setAttribute( 'z_position', new THREE.BufferAttribute(z_position_array_32,1));
    bufferGeometry.setAttribute( 'x_position', new THREE.BufferAttribute(x_position_array_32,1));
    bufferGeometry.setAttribute( 'y_position', new THREE.BufferAttribute(y_position_array_32,1));
    bufferGeometry.setAttribute( 'h_position', new THREE.BufferAttribute(h_position_array_32,1));
                
    let material = activate_animation()
    

    var point = new THREE.Points( bufferGeometry, material);
    //create_temp_histogram();	 <==== je déplace ailleurs	
            
    grid.add(point);
    scene.add(grid);
}

export function create_2D_plane_series(MesoNH_O_array,MesoNH_U_array,MesoNH_V_array,grid,id_sbl_array,id_meso_array,temperature_scale,THAT,THAT_W,HCanopy,HCanopy_w){

    general_config.temp_values = [];
    var ni = general_config.data_ni, 
    nj = general_config.data_nj;
    let tab_temp= [];   
    var coord_array = [];
    var colors = [];
    var sizes = [];
    var transparency_factor_array = [];
    var custompercentagearray = [];
    var z_position_array = [];
    var x_position_array = [];
    var y_position_array = [];
    
    var h_position_array = [];
    
    general_config.z_min = null;
    general_config.z_max = null;
    general_config.x_min = null;
    general_config.x_max = null;
    general_config.y_min = null;
    general_config.y_max = null;
    
    general_config.h_min = null;
    general_config.h_max = null;
    
    for(var m=0; m<id_sbl_array.length; m++){
        for(var j=0; j<nj; j++){
            for(var i=0; i<ni; i++){
                var index_1 = j*ni + i;
                var h;
                var h_w;
                switch(id_sbl_array[m]){
                    case 1:
                        temp = MesoNH_O_array[index_1].teb_1;
                        h = HCanopy[0];
                        h_w = HCanopy_w[0];
                        break;
                    case 2:
                        temp = MesoNH_O_array[index_1].teb_2;
                        h = HCanopy[1];
                        h_w = HCanopy_w[1];
                        break;
                    case 3:
                        temp = MesoNH_O_array[index_1].teb_3;
                        h = HCanopy[2];
                        h_w = HCanopy_w[2];
                        break;
                    case 4:
                        temp = MesoNH_O_array[index_1].teb_4;
                        h = HCanopy[3];
                        h_w = HCanopy_w[3];
                        break;
                    case 5:
                        temp = MesoNH_O_array[index_1].teb_5;
                        h = HCanopy[4];
                        h_w = HCanopy_w[4];
                        break;
                    case 6:
                        temp = MesoNH_O_array[index_1].teb_6;
                        h = HCanopy[5];
                        h_w = HCanopy_w[5];
                        break;
                    default:
                        return;
                }
                
                tab_temp.push(parseFloat(temp));
                var x_o = MesoNH_O_array[index_1].x - general_config.Coord_X_paris;
                var y_o = MesoNH_O_array[index_1].y - general_config.Coord_Y_paris;					
                var z_o = MesoNH_O_array[index_1].zs + h;
                                
                var l_x = (MesoNH_O_array[index_1].x - MesoNH_U_array[index_1].x)*2;
                var l_y = (MesoNH_O_array[index_1].y - MesoNH_V_array[index_1].y)*2;
                var l_z = (h - h_w)*2;
                
                if(general_config.h_min != null && general_config.h_max != null){
                    if(h_w < general_config.h_min){
                        general_config.h_min = h_w;
                    }
                    if((h_w + l_z) > general_config.h_max){
                        general_config.h_max = (h_w + l_z);
                    }
                } else {
                    general_config.h_min = h_w;
                    general_config.h_max = (h_w + l_z);
                }
               
                if(general_config.z_min != null && general_config.z_max != null){
                    if((z_o - l_z/2) < general_config.z_min){
                        general_config.z_min = z_o - l_z/2;
                    }
                    if((z_o + l_z/2) > general_config.z_max){
                        general_config.z_max = z_o + l_z/2;
                    }
                } else {
                    general_config.z_min = z_o - l_z/2;
                    general_config.z_max = z_o + l_z/2;
                }
                
                if(general_config.x_min != null && general_config.x_max != null){
                    if((x_o - l_x/2) < general_config.x_min){
                        general_config.x_min = x_o - l_x/2;
                    }
                    if((x_o + l_x/2) > general_config.x_max){
                        general_config.x_max = x_o + l_x/2;
                    }
                } else {
                    general_config.x_min = x_o - l_x/2;
                    general_config.x_max = x_o + l_x/2;
                }
                
                if(general_config.y_min != null && general_config.y_max != null){
                    if((y_o - l_y/2) < general_config.y_min){
                        general_config.y_min = y_o - l_y/2;
                    }
                    if((y_o + l_y/2) > general_config.y_max){
                        general_config.y_max = y_o + l_y/2;
                    }
                } else {
                    general_config.y_min = y_o - l_y/2;
                    general_config.y_max = y_o + l_y/2;
                }
                
            }
        }
    }	
    

    for(var m=0; m<id_meso_array.length; m++){
        for(var j=0; j<nj; j++){
            for(var i=0; i<ni; i++){
                var index_1 = j*ni + i;
                
                var h;
                var h_w;
                switch(id_meso_array[m]){
                    case 2:
                        temp = MesoNH_O_array[index_1].tht_2;
                        h = THAT[1];
                        h_w = THAT_W[1];
                        break;
                    case 3:
                        temp = MesoNH_O_array[index_1].tht_3;
                        h = THAT[2];
                        h_w = THAT_W[2];
                        break;
                    case 4:
                        temp = MesoNH_O_array[index_1].tht_4;
                        h = THAT[3];
                        h_w = THAT_W[3];
                        break;
                    case 5:
                        temp = MesoNH_O_array[index_1].tht_5;
                        h = THAT[4];
                        h_w = THAT_W[4];
                        break;
                    case 6:
                        temp = MesoNH_O_array[index_1].tht_6;
                        h = THAT[5];
                        h_w = THAT_W[5];
                        break;
                    case 7:
                        temp = MesoNH_O_array[index_1].tht_7;
                        h = THAT[6];
                        h_w = THAT_W[6];
                        break;
                    case 8:
                        temp = MesoNH_O_array[index_1].tht_8;
                        h = THAT[7];
                        h_w = THAT_W[7];
                        break;
                    case 9:
                        temp = MesoNH_O_array[index_1].tht_9;
                        h = THAT[8];
                        h_w = THAT_W[8];
                        break;
                    case 10:
                        temp = MesoNH_O_array[index_1].tht_10;
                        h = THAT[9];
                        h_w = THAT_W[9];
                        break;
                    case 11:
                        temp = MesoNH_O_array[index_1].tht_11;
                        h = THAT[10];
                        h_w = THAT_W[10];
                        break;
                    case 12:
                        temp = MesoNH_O_array[index_1].tht_12;
                        h = THAT[11];
                        h_w = THAT_W[11];
                        break;
                    case 13:
                        temp = MesoNH_O_array[index_1].tht_13;
                        h = THAT[12];
                        h_w = THAT_W[12];
                        break;
                    case 14:
                        temp = MesoNH_O_array[index_1].tht_14;
                        h = THAT[13];
                        h_w = THAT_W[13];
                        break;
                    case 15:
                        temp = MesoNH_O_array[index_1].tht_15;
                        h = THAT[14];
                        h_w = THAT_W[14];
                        break;
                    case 16:
                        temp = MesoNH_O_array[index_1].tht_16;
                        h = THAT[15];
                        h_w = THAT_W[15];
                        break;
                    case 17:
                        temp = MesoNH_O_array[index_1].tht_17;
                        h = THAT[16];
                        h_w = THAT_W[16];
                        break;
                    case 18:
                        temp = MesoNH_O_array[index_1].tht_18;
                        h = THAT[17];
                        h_w = THAT_W[17];
                        break;
                    case 19:
                        temp = MesoNH_O_array[index_1].tht_19;
                        h = THAT[18];
                        h_w = THAT_W[18];
                        break;
                    case 20:
                        temp = MesoNH_O_array[index_1].tht_20;
                        h = THAT[19];
                        h_w = THAT_W[19];
                        break;
                    case 21:
                        temp = MesoNH_O_array[index_1].tht_21;
                        h = THAT[20];
                        h_w = THAT_W[20];
                        break;
                    case 22:
                        temp = MesoNH_O_array[index_1].tht_22;
                        h = THAT[21];
                        h_w = THAT_W[21];
                        break;
                    case 23:
                        temp = MesoNH_O_array[index_1].tht_23;
                        h = THAT[22];
                        h_w = THAT_W[22];
                        break;
                    case 24:
                        temp = MesoNH_O_array[index_1].tht_24;
                        h = THAT[23];
                        h_w = THAT_W[23];
                        break;
                    case 25:
                        temp = MesoNH_O_array[index_1].tht_25;
                        h = THAT[24];
                        h_w = THAT_W[24];
                        break;
                    case 26:
                        temp = MesoNH_O_array[index_1].tht_26;
                        h = THAT[25];
                        h_w = THAT_W[25];
                        break;
                    case 27:
                        temp = MesoNH_O_array[index_1].tht_27;
                        h = THAT[26];
                        h_w = THAT_W[26];
                        break;
                    case 28:
                        temp = MesoNH_O_array[index_1].tht_28;
                        h = THAT[27];
                        h_w = THAT_W[27];
                        break;
                    case 29:
                        temp = MesoNH_O_array[index_1].tht_29;
                        h = THAT[28];
                        h_w = THAT_W[28];
                        break;
                    case 30:
                        temp = MesoNH_O_array[index_1].tht_30;
                        h = THAT[29];
                        h_w = THAT_W[29];
                        break;
                    case 31:
                        temp = MesoNH_O_array[index_1].tht_31;
                        h = THAT[30];
                        h_w = THAT_W[30];
                        break;
                    case 32:
                        temp = MesoNH_O_array[index_1].tht_32;
                        h = THAT[31];
                        h_w = THAT_W[31];
                        break;
                    default:
                        return;
                }
                
                tab_temp.push(parseFloat(temp))
                var x_o = MesoNH_O_array[index_1].x - general_config.Coord_X_paris;
                var y_o = MesoNH_O_array[index_1].y - general_config.Coord_Y_paris;					
                var z_o = MesoNH_O_array[index_1].zs + h;
                
                var l_x = (MesoNH_O_array[index_1].x - MesoNH_U_array[index_1].x)*2;
                var l_y = (MesoNH_O_array[index_1].y - MesoNH_V_array[index_1].y)*2;
                var l_z = (h-h_w)*2;
                                
                if(general_config.h_min != null && general_config.h_max != null){
                    if(h_w < general_config.h_min){
                        general_config.h_min = h_w;
                    }
                    if((h_w + l_z) > general_config.h_max){
                        general_config.h_max = (h_w + l_z);
                    }
                } else {
                    general_config.h_min = h_w;
                    general_config.h_max = (h_w + l_z);
                }
                    
                if(general_config.z_min != null && general_config.z_max != null){
                    if((z_o - l_z/2) < general_config.z_min){
                        general_config.z_min = z_o - l_z/2;
                    }
                    if((z_o + l_z/2) > general_config.z_max){
                        general_config.z_max = z_o + l_z/2;
                    }
                } else {
                    general_config.z_min = z_o - l_z/2;
                    general_config.z_max = z_o + l_z/2;
                }
                
                if(general_config.x_min != null && general_config.x_max != null){
                    if((x_o - l_x/2) < general_config.x_min){
                        general_config.x_min = x_o - l_x/2;
                    }
                    if((x_o + l_x/2) > general_config.x_max){
                        general_config.x_max = x_o + l_x/2;
                    }
                } else {
                    general_config.x_min = x_o - l_x/2;
                    general_config.x_max = x_o + l_x/2;
                }
                
                if(general_config.y_min != null && general_config.y_max != null){
                    if((y_o - l_y/2) < general_config.y_min){
                        general_config.y_min = y_o - l_y/2;
                    }
                    if((y_o + l_y/2) > general_config.y_max){
                        general_config.y_max = y_o + l_y/2;
                    }
                } else {
                    general_config.y_min = y_o - l_y/2;
                    general_config.y_max = y_o + l_y/2;
                }
            
                
            }
        }
    }	
    
    tab_temp.sort((a,b) => a-b)

    for(var m=0; m<id_sbl_array.length; m++){
        for(var j=0; j<nj; j++){
            for(var i=0; i<ni; i++){
                var index_1 = j*ni + i;
                var temp;
                var h;
                var h_w;
                switch(id_sbl_array[m]){
                    case 1:
                        temp = MesoNH_O_array[index_1].teb_1;
                        h = HCanopy[0];
                        h_w = HCanopy_w[0];
                        break;
                    case 2:
                        temp = MesoNH_O_array[index_1].teb_2;
                        h = HCanopy[1];
                        h_w = HCanopy_w[1];
                        break;
                    case 3:
                        temp = MesoNH_O_array[index_1].teb_3;
                        h = HCanopy[2];
                        h_w = HCanopy_w[2];
                        break;
                    case 4:
                        temp = MesoNH_O_array[index_1].teb_4;
                        h = HCanopy[3];
                        h_w = HCanopy_w[3];
                        break;
                    case 5:
                        temp = MesoNH_O_array[index_1].teb_5;
                        h = HCanopy[4];
                        h_w = HCanopy_w[4];
                        break;
                    case 6:
                        temp = MesoNH_O_array[index_1].teb_6;
                        h = HCanopy[5];
                        h_w = HCanopy_w[5];
                        break;
                    default:
                        return;
                }
                
                var tmin = temperature_scale[0];
                var tmax = temperature_scale[1];
                if (temp >= tmin && temp <= tmax) {

                    var x_u = MesoNH_U_array[index_1].x - general_config.Coord_X_paris;
                    var y_u = MesoNH_U_array[index_1].y - general_config.Coord_Y_paris;
                    var z_u = MesoNH_U_array[index_1].zs + h;
                    
                    var x_v = MesoNH_V_array[index_1].x - general_config.Coord_X_paris;
                    var y_v = MesoNH_V_array[index_1].y - general_config.Coord_Y_paris;
                    var z_v = MesoNH_V_array[index_1].zs + h;
                    
                    var z_o = MesoNH_O_array[index_1].zs + h;
                    
                    var l_x = (MesoNH_O_array[index_1].x - MesoNH_U_array[index_1].x)*2
                    var l_y = (MesoNH_O_array[index_1].y - MesoNH_V_array[index_1].y)*2
                    
                    //up				
                    coord_array.push(x_u*general_config.cst_X); 
                    coord_array.push(z_o*general_config.cst_Z);
                    coord_array.push(-(y_v + l_y)*general_config.cst_Y);
                    coord_array.push(x_u*general_config.cst_X);
                    coord_array.push(z_o*general_config.cst_Z); 
                    coord_array.push(-y_v*general_config.cst_Y);
                    coord_array.push((x_u + l_x)*general_config.cst_X); 
                    coord_array.push(z_o*general_config.cst_Z);
                    coord_array.push(-y_v*general_config.cst_Y);
                    
                    coord_array.push(x_u*general_config.cst_X); 
                    coord_array.push(z_o*general_config.cst_Z);
                    coord_array.push(-(y_v + l_y)*general_config.cst_Y);
                    coord_array.push((x_u + l_x)*general_config.cst_X); 
                    coord_array.push(z_o*general_config.cst_Z);
                    coord_array.push(-y_v*general_config.cst_Y);
                    coord_array.push((x_u + l_x)*general_config.cst_X); 
                    coord_array.push(z_o*general_config.cst_Z);
                    coord_array.push(-(y_v + l_y)*general_config.cst_Y);
                    
                    //down
                    coord_array.push(x_u*general_config.cst_X); 
                    coord_array.push(z_o*general_config.cst_Z);
                    coord_array.push(-(y_v + l_y)*general_config.cst_Y);
                    coord_array.push((x_u + l_x)*general_config.cst_X); 
                    coord_array.push(z_o*general_config.cst_Z);
                    coord_array.push(-y_v*general_config.cst_Y);
                    coord_array.push(x_u*general_config.cst_X); 
                    coord_array.push(z_o*general_config.cst_Z);
                    coord_array.push(-y_v*general_config.cst_Y);
                    
                    coord_array.push(x_u*general_config.cst_X); 
                    coord_array.push(z_o*general_config.cst_Z);
                    coord_array.push(-(y_v + l_y)*general_config.cst_Y);
                    coord_array.push((x_u + l_x)*general_config.cst_X); 
                    coord_array.push(z_o*general_config.cst_Z);
                    coord_array.push(-(y_v + l_y)*general_config.cst_Y);
                    coord_array.push((x_u + l_x)*general_config.cst_X); 
                    coord_array.push(z_o*general_config.cst_Z);
                    coord_array.push(-y_v*general_config.cst_Y);
                    
                    
                    
                    var percentage_color = (temp - tmin)/(tmax - tmin);
                    if(percentage_color<0){
                        percentage_color = 0;
                    } else if(percentage_color >1){
                        percentage_color = 1;
                    }
                    
                    general_config.temp_values.push(parseFloat(temp));
                    var color_hex = getHCLcolor(tab_temp, temp, percentage_color,general_config.HCL_color_scales[general_config.active_HCL_id].scale);
                            
                    
                    var color_rgb = hexToRgb(color_hex)
                    
                    var color_r = color_rgb.r/255;
                    var color_g = color_rgb.g/255;
                    var color_b = color_rgb.b/255;
                    var transparency = general_config.transparency_factor;
                            
                    colors.push(color_r);colors.push(color_g);colors.push(color_b);
                    colors.push(color_r);colors.push(color_g);colors.push(color_b);
                    colors.push(color_r);colors.push(color_g);colors.push(color_b);
                    colors.push(color_r);colors.push(color_g);colors.push(color_b);
                    colors.push(color_r);colors.push(color_g);colors.push(color_b);
                    colors.push(color_r);colors.push(color_g);colors.push(color_b);
                                                                                
                    colors.push(color_r);colors.push(color_g);colors.push(color_b);
                    colors.push(color_r);colors.push(color_g);colors.push(color_b);
                    colors.push(color_r);colors.push(color_g);colors.push(color_b);
                    colors.push(color_r);colors.push(color_g);colors.push(color_b);
                    colors.push(color_r);colors.push(color_g);colors.push(color_b);
                    colors.push(color_r);colors.push(color_g);colors.push(color_b);
                } else {
                    general_config.temp_values.push(parseFloat(temp));
                }
                
            }
        }
    }	

    for(var m=0; m<id_meso_array.length; m++){
        for(var j=0; j<nj; j++){
            for(var i=0; i<ni; i++){
                var index_1 = j*ni + i;
                
                var temp;
                var h;
                var h_w;
                switch(id_meso_array[m]){
                    case 2:
                        temp = MesoNH_O_array[index_1].tht_2;
                        h = THAT[1];
                        h_w = THAT_W[1];
                        break;
                    case 3:
                        temp = MesoNH_O_array[index_1].tht_3;
                        h = THAT[2];
                        h_w = THAT_W[2];
                        break;
                    case 4:
                        temp = MesoNH_O_array[index_1].tht_4;
                        h = THAT[3];
                        h_w = THAT_W[3];
                        break;
                    case 5:
                        temp = MesoNH_O_array[index_1].tht_5;
                        h = THAT[4];
                        h_w = THAT_W[4];
                        break;
                    case 6:
                        temp = MesoNH_O_array[index_1].tht_6;
                        h = THAT[5];
                        h_w = THAT_W[5];
                        break;
                    case 7:
                        temp = MesoNH_O_array[index_1].tht_7;
                        h = THAT[6];
                        h_w = THAT_W[6];
                        break;
                    case 8:
                        temp = MesoNH_O_array[index_1].tht_8;
                        h = THAT[7];
                        h_w = THAT_W[7];
                        break;
                    case 9:
                        temp = MesoNH_O_array[index_1].tht_9;
                        h = THAT[8];
                        h_w = THAT_W[8];
                        break;
                    case 10:
                        temp = MesoNH_O_array[index_1].tht_10;
                        h = THAT[9];
                        h_w = THAT_W[9];
                        break;
                    case 11:
                        temp = MesoNH_O_array[index_1].tht_11;
                        h = THAT[10];
                        h_w = THAT_W[10];
                        break;
                    case 12:
                        temp = MesoNH_O_array[index_1].tht_12;
                        h = THAT[11];
                        h_w = THAT_W[11];
                        break;
                    case 13:
                        temp = MesoNH_O_array[index_1].tht_13;
                        h = THAT[12];
                        h_w = THAT_W[12];
                        break;
                    case 14:
                        temp = MesoNH_O_array[index_1].tht_14;
                        h = THAT[13];
                        h_w = THAT_W[13];
                        break;
                    case 15:
                        temp = MesoNH_O_array[index_1].tht_15;
                        h = THAT[14];
                        h_w = THAT_W[14];
                        break;
                    case 16:
                        temp = MesoNH_O_array[index_1].tht_16;
                        h = THAT[15];
                        h_w = THAT_W[15];
                        break;
                    case 17:
                        temp = MesoNH_O_array[index_1].tht_17;
                        h = THAT[16];
                        h_w = THAT_W[16];
                        break;
                    case 18:
                        temp = MesoNH_O_array[index_1].tht_18;
                        h = THAT[17];
                        h_w = THAT_W[17];
                        break;
                    case 19:
                        temp = MesoNH_O_array[index_1].tht_19;
                        h = THAT[18];
                        h_w = THAT_W[18];
                        break;
                    case 20:
                        temp = MesoNH_O_array[index_1].tht_20;
                        h = THAT[19];
                        h_w = THAT_W[19];
                        break;
                    case 21:
                        temp = MesoNH_O_array[index_1].tht_21;
                        h = THAT[20];
                        h_w = THAT_W[20];
                        break;
                    case 22:
                        temp = MesoNH_O_array[index_1].tht_22;
                        h = THAT[21];
                        h_w = THAT_W[21];
                        break;
                    case 23:
                        temp = MesoNH_O_array[index_1].tht_23;
                        h = THAT[22];
                        h_w = THAT_W[22];
                        break;
                    case 24:
                        temp = MesoNH_O_array[index_1].tht_24;
                        h = THAT[23];
                        h_w = THAT_W[23];
                        break;
                    case 25:
                        temp = MesoNH_O_array[index_1].tht_25;
                        h = THAT[24];
                        h_w = THAT_W[24];
                        break;
                    case 26:
                        temp = MesoNH_O_array[index_1].tht_26;
                        h = THAT[25];
                        h_w = THAT_W[25];
                        break;
                    case 27:
                        temp = MesoNH_O_array[index_1].tht_27;
                        h = THAT[26];
                        h_w = THAT_W[26];
                        break;
                    case 28:
                        temp = MesoNH_O_array[index_1].tht_28;
                        h = THAT[27];
                        h_w = THAT_W[27];
                        break;
                    case 29:
                        temp = MesoNH_O_array[index_1].tht_29;
                        h = THAT[28];
                        h_w = THAT_W[28];
                        break;
                    case 30:
                        temp = MesoNH_O_array[index_1].tht_30;
                        h = THAT[29];
                        h_w = THAT_W[29];
                        break;
                    case 31:
                        temp = MesoNH_O_array[index_1].tht_31;
                        h = THAT[30];
                        h_w = THAT_W[30];
                        break;
                    case 32:
                        temp = MesoNH_O_array[index_1].tht_32;
                        h = THAT[31];
                        h_w = THAT_W[31];
                        break;
                    default:
                        return;
                }
                           
                var tmin = temperature_scale[0];
                var tmax = temperature_scale[1];
                if (temp >= tmin && temp <= tmax) {
                    var x_u = MesoNH_U_array[index_1].x - general_config.Coord_X_paris;
                    var y_u = MesoNH_U_array[index_1].y - general_config.Coord_Y_paris;
                    var z_u = MesoNH_U_array[index_1].zs + h;
                    
                    var x_v = MesoNH_V_array[index_1].x - general_config.Coord_X_paris;
                    var y_v = MesoNH_V_array[index_1].y - general_config.Coord_Y_paris;
                    var z_v = MesoNH_V_array[index_1].zs + h;
                    
                    var z_o = MesoNH_O_array[index_1].zs + h;
                    
                    var l_x = (MesoNH_O_array[index_1].x - MesoNH_U_array[index_1].x)*2
                    var l_y = (MesoNH_O_array[index_1].y - MesoNH_V_array[index_1].y)*2
                    
                    //up				
                    coord_array.push(x_u*general_config.cst_X); 
                    coord_array.push(z_o*general_config.cst_Z);
                    coord_array.push(-(y_v + l_y)*general_config.cst_Y);
                    coord_array.push(x_u*general_config.cst_X); 
                    coord_array.push(z_o*general_config.cst_Z);
                    coord_array.push(-y_v*general_config.cst_Y);
                    coord_array.push((x_u + l_x)*general_config.cst_X); 
                    coord_array.push(z_o*general_config.cst_Z);
                    coord_array.push(-y_v*general_config.cst_Y);
                    
                    coord_array.push(x_u*general_config.cst_X); 
                    coord_array.push(z_o*general_config.cst_Z);
                    coord_array.push(-(y_v + l_y)*general_config.cst_Y);
                    coord_array.push((x_u + l_x)*general_config.cst_X); 
                    coord_array.push(z_o*general_config.cst_Z);
                    coord_array.push(-y_v*general_config.cst_Y);
                    coord_array.push((x_u + l_x)*general_config.cst_X); 
                    coord_array.push(z_o*general_config.cst_Z);
                    coord_array.push(-(y_v + l_y)*general_config.cst_Y);
                    
                    //down
                    coord_array.push(x_u*general_config.cst_X); 
                    coord_array.push(z_o*general_config.cst_Z);
                    coord_array.push(-(y_v + l_y)*general_config.cst_Y);
                    coord_array.push((x_u + l_x)*general_config.cst_X); 
                    coord_array.push(z_o*general_config.cst_Z);
                    coord_array.push(-y_v*general_config.cst_Y);
                    coord_array.push(x_u*general_config.cst_X); 
                    coord_array.push(z_o*general_config.cst_Z);
                    coord_array.push(-y_v*general_config.cst_Y);
                    
                    coord_array.push(x_u*general_config.cst_X); 
                    coord_array.push(z_o*general_config.cst_Z);
                    coord_array.push(-(y_v + l_y)*general_config.cst_Y);
                    coord_array.push((x_u + l_x)*general_config.cst_X); 
                    coord_array.push(z_o*general_config.cst_Z);
                    coord_array.push(-(y_v + l_y)*general_config.cst_Y);
                    coord_array.push((x_u + l_x)*general_config.cst_X); 
                    coord_array.push(z_o*general_config.cst_Z);
                    coord_array.push(-y_v*general_config.cst_Y);
                    
                    
                    
                    var percentage_color = (temp - tmin)/(tmax - tmin);
                    if(percentage_color<0){
                        percentage_color = 0;
                    } else if(percentage_color >1){
                        percentage_color = 1;
                    }
                    
                    general_config.temp_values.push(parseFloat(temp));
                    var color_hex = getHCLcolor(tab_temp, temp, percentage_color,general_config.HCL_color_scales[general_config.active_HCL_id].scale);
                    

                    var color_rgb = hexToRgb(color_hex)
                    
                    var color_r = color_rgb.r/255;
                    var color_g = color_rgb.g/255;
                    var color_b = color_rgb.b/255;
                    var transparency = general_config.transparency_factor;
                    
                    
                    colors.push(color_r);colors.push(color_g);colors.push(color_b);
                    colors.push(color_r);colors.push(color_g);colors.push(color_b);
                    colors.push(color_r);colors.push(color_g);colors.push(color_b);
                    colors.push(color_r);colors.push(color_g);colors.push(color_b);
                    colors.push(color_r);colors.push(color_g);colors.push(color_b);
                    colors.push(color_r);colors.push(color_g);colors.push(color_b);
                                                                                
                    colors.push(color_r);colors.push(color_g);colors.push(color_b);
                    colors.push(color_r);colors.push(color_g);colors.push(color_b);
                    colors.push(color_r);colors.push(color_g);colors.push(color_b);
                    colors.push(color_r);colors.push(color_g);colors.push(color_b);
                    colors.push(color_r);colors.push(color_g);colors.push(color_b);
                    colors.push(color_r);colors.push(color_g);colors.push(color_b);
                } else {
                    general_config.temp_values.push(parseFloat(temp));
                }
                
                
            }
        }
    }			
    
            
    var coord_array_32 = new Float32Array(coord_array);
    var colors_32 = new Float32Array(colors); 
   
        
    var material = new THREE.MeshBasicMaterial({  opacity:general_config.transparency_factor, transparent: true,vertexColors: THREE.VertexColors  });
    var bufferGeometry = new THREE.BufferGeometry();
    
    bufferGeometry.setAttribute( 'position', new THREE.BufferAttribute( coord_array_32, 3 ) );
    bufferGeometry.setAttribute( 'color', new THREE.BufferAttribute( colors_32, 3 ) );
    var mesh = new THREE.Mesh( bufferGeometry, material);
            
    //create_temp_histogram();	 <==== je déplace ds showPointsPlanes
            
    grid.add(mesh);
    scene.add(grid);
 
}

export function create_2D_points_cloud(MesoNH_O_array,MesoNH_U_array,MesoNH_V_array,grid,id_sbl_array,id_meso_array,temperature_scale,THAT,THAT_W,HCanopy,HCanopy_w,number_points){
    
    general_config.temp_values = [];
    var ni = general_config.data_ni, 
    nj = general_config.data_nj;
    let tab_temp = [];       
    var coord_array = [];
    var colors = [];
    var sizes = [];
    var transparency_factor_array = [];
    var custompercentagearray = [];
    var z_position_array = [];
    var x_position_array = [];
    var y_position_array = [];
    
    var h_position_array = [];
    
    general_config.z_min = null;
    general_config.z_max = null;
    general_config.x_min = null;
    general_config.x_max = null;
    general_config.y_min = null;
    general_config.y_max = null;
    
    general_config.h_min = null;
    general_config.h_max = null;
    for(var m=0; m<id_sbl_array.length; m++){
        for(var j=0; j<nj; j++){
            for(var i=0; i<ni; i++){
                var index_1 = j*ni + i;
                var h;
                var h_w;
                switch(id_sbl_array[m]){
                    case 1:
                        temp = MesoNH_O_array[index_1].teb_1;
                        h = HCanopy[0];
                        h_w = HCanopy_w[0];
                        break;
                    case 2:
                        temp = MesoNH_O_array[index_1].teb_2;
                        h = HCanopy[1];
                        h_w = HCanopy_w[1];
                        break;
                    case 3:
                        temp = MesoNH_O_array[index_1].teb_3;
                        h = HCanopy[2];
                        h_w = HCanopy_w[2];
                        break;
                    case 4:
                        temp = MesoNH_O_array[index_1].teb_4;
                        h = HCanopy[3];
                        h_w = HCanopy_w[3];
                        break;
                    case 5:
                        temp = MesoNH_O_array[index_1].teb_5;
                        h = HCanopy[4];
                        h_w = HCanopy_w[4];
                        break;
                    case 6:
                        temp = MesoNH_O_array[index_1].teb_6;
                        h = HCanopy[5];
                        h_w = HCanopy_w[5];
                        break;
                    default:
                        return;
                }
                
                tab_temp.push(parseFloat(temp))
                var x_o = MesoNH_O_array[index_1].x - general_config.Coord_X_paris;
                var y_o = MesoNH_O_array[index_1].y - general_config.Coord_Y_paris;					
                var z_o = MesoNH_O_array[index_1].zs + h;
                                
                var l_x = (MesoNH_O_array[index_1].x - MesoNH_U_array[index_1].x)*2;
                var l_y = (MesoNH_O_array[index_1].y - MesoNH_V_array[index_1].y)*2;
                var l_z = (h - h_w)*2;
                
                if(general_config.h_min != null && general_config.h_max != null){
                    if(h_w < general_config.h_min){
                        general_config.h_min = h_w;
                    }
                    if((h_w + l_z) > general_config.h_max){
                        general_config.h_max = (h_w + l_z);
                    }
                } else {
                    general_config.h_min = h_w;
                    general_config.h_max = (h_w + l_z);
                }
                
                if(general_config.z_min != null && general_config.z_max != null){
                    if((z_o - l_z/2) < general_config.z_min){
                        general_config.z_min = z_o - l_z/2;
                    }
                    if((z_o + l_z/2) > general_config.z_max){
                        general_config.z_max = z_o + l_z/2;
                    }
                } else {
                    general_config.z_min = z_o - l_z/2;
                    general_config.z_max = z_o + l_z/2;
                }
                
                if(general_config.x_min != null && general_config.x_max != null){
                    if((x_o - l_x/2) < general_config.x_min){
                        general_config.x_min = x_o - l_x/2;
                    }
                    if((x_o + l_x/2) > general_config.x_max){
                        general_config.x_max = x_o + l_x/2;
                    }
                } else {
                    general_config.x_min = x_o - l_x/2;
                    general_config.x_max = x_o + l_x/2;
                }
                
                if(general_config.y_min != null && general_config.y_max != null){
                    if((y_o - l_y/2) < general_config.y_min){
                        general_config.y_min = y_o - l_y/2;
                    }
                    if((y_o + l_y/2) > general_config.y_max){
                        general_config.y_max = y_o + l_y/2;
                    }
                } else {
                    general_config.y_min = y_o - l_y/2;
                    general_config.y_max = y_o + l_y/2;
                }
                
            }
        }
    }	
    

    for(var m=0; m<id_meso_array.length; m++){
        for(var j=0; j<nj; j++){
            for(var i=0; i<ni; i++){
                var index_1 = j*ni + i;
                
                var h;
                var h_w;
                switch(id_meso_array[m]){
                    case 2:
                        temp = MesoNH_O_array[index_1].tht_2;
                        h = THAT[1];
                        h_w = THAT_W[1];
                        break;
                    case 3:
                        temp = MesoNH_O_array[index_1].tht_3;
                        h = THAT[2];
                        h_w = THAT_W[2];
                        break;
                    case 4:
                        temp = MesoNH_O_array[index_1].tht_4;
                        h = THAT[3];
                        h_w = THAT_W[3];
                        break;
                    case 5:
                        temp = MesoNH_O_array[index_1].tht_5;
                        h = THAT[4];
                        h_w = THAT_W[4];
                        break;
                    case 6:
                        temp = MesoNH_O_array[index_1].tht_6;
                        h = THAT[5];
                        h_w = THAT_W[5];
                        break;
                    case 7:
                        temp = MesoNH_O_array[index_1].tht_7;
                        h = THAT[6];
                        h_w = THAT_W[6];
                        break;
                    case 8:
                        temp = MesoNH_O_array[index_1].tht_8;
                        h = THAT[7];
                        h_w = THAT_W[7];
                        break;
                    case 9:
                        temp = MesoNH_O_array[index_1].tht_9;
                        h = THAT[8];
                        h_w = THAT_W[8];
                        break;
                    case 10:
                        temp = MesoNH_O_array[index_1].tht_10;
                        h = THAT[9];
                        h_w = THAT_W[9];
                        break;
                    case 11:
                        temp = MesoNH_O_array[index_1].tht_11;
                        h = THAT[10];
                        h_w = THAT_W[10];
                        break;
                    case 12:
                        temp = MesoNH_O_array[index_1].tht_12;
                        h = THAT[11];
                        h_w = THAT_W[11];
                        break;
                    case 13:
                        temp = MesoNH_O_array[index_1].tht_13;
                        h = THAT[12];
                        h_w = THAT_W[12];
                        break;
                    case 14:
                        temp = MesoNH_O_array[index_1].tht_14;
                        h = THAT[13];
                        h_w = THAT_W[13];
                        break;
                    case 15:
                        temp = MesoNH_O_array[index_1].tht_15;
                        h = THAT[14];
                        h_w = THAT_W[14];
                        break;
                    case 16:
                        temp = MesoNH_O_array[index_1].tht_16;
                        h = THAT[15];
                        h_w = THAT_W[15];
                        break;
                    case 17:
                        temp = MesoNH_O_array[index_1].tht_17;
                        h = THAT[16];
                        h_w = THAT_W[16];
                        break;
                    case 18:
                        temp = MesoNH_O_array[index_1].tht_18;
                        h = THAT[17];
                        h_w = THAT_W[17];
                        break;
                    case 19:
                        temp = MesoNH_O_array[index_1].tht_19;
                        h = THAT[18];
                        h_w = THAT_W[18];
                        break;
                    case 20:
                        temp = MesoNH_O_array[index_1].tht_20;
                        h = THAT[19];
                        h_w = THAT_W[19];
                        break;
                    case 21:
                        temp = MesoNH_O_array[index_1].tht_21;
                        h = THAT[20];
                        h_w = THAT_W[20];
                        break;
                    case 22:
                        temp = MesoNH_O_array[index_1].tht_22;
                        h = THAT[21];
                        h_w = THAT_W[21];
                        break;
                    case 23:
                        temp = MesoNH_O_array[index_1].tht_23;
                        h = THAT[22];
                        h_w = THAT_W[22];
                        break;
                    case 24:
                        temp = MesoNH_O_array[index_1].tht_24;
                        h = THAT[23];
                        h_w = THAT_W[23];
                        break;
                    case 25:
                        temp = MesoNH_O_array[index_1].tht_25;
                        h = THAT[24];
                        h_w = THAT_W[24];
                        break;
                    case 26:
                        temp = MesoNH_O_array[index_1].tht_26;
                        h = THAT[25];
                        h_w = THAT_W[25];
                        break;
                    case 27:
                        temp = MesoNH_O_array[index_1].tht_27;
                        h = THAT[26];
                        h_w = THAT_W[26];
                        break;
                    case 28:
                        temp = MesoNH_O_array[index_1].tht_28;
                        h = THAT[27];
                        h_w = THAT_W[27];
                        break;
                    case 29:
                        temp = MesoNH_O_array[index_1].tht_29;
                        h = THAT[28];
                        h_w = THAT_W[28];
                        break;
                    case 30:
                        temp = MesoNH_O_array[index_1].tht_30;
                        h = THAT[29];
                        h_w = THAT_W[29];
                        break;
                    case 31:
                        temp = MesoNH_O_array[index_1].tht_31;
                        h = THAT[30];
                        h_w = THAT_W[30];
                        break;
                    case 32:
                        temp = MesoNH_O_array[index_1].tht_32;
                        h = THAT[31];
                        h_w = THAT_W[31];
                        break;
                    default:
                        return;
                }

                tab_temp.push(parseFloat(temp));
                                                
                var x_o = MesoNH_O_array[index_1].x - general_config.Coord_X_paris;
                var y_o = MesoNH_O_array[index_1].y - general_config.Coord_Y_paris;					
                var z_o = MesoNH_O_array[index_1].zs + h;
                
                var l_x = (MesoNH_O_array[index_1].x - MesoNH_U_array[index_1].x)*2;
                var l_y = (MesoNH_O_array[index_1].y - MesoNH_V_array[index_1].y)*2;
                var l_z = (h-h_w)*2;
                                
                if(general_config.h_min != null && general_config.h_max != null){
                    if(h_w < general_config.h_min){
                        general_config.h_min = h_w;
                    }
                    if((h_w + l_z) > general_config.h_max){
                        general_config.h_max = (h_w + l_z);
                    }
                } else {
                    general_config.h_min = h_w;
                    general_config.h_max = (h_w + l_z);
                }
                    
                if(general_config.z_min != null && general_config.z_max != null){
                    if((z_o - l_z/2) < general_config.z_min){
                        general_config.z_min = z_o - l_z/2;
                    }
                    if((z_o + l_z/2) > general_config.z_max){
                        general_config.z_max = z_o + l_z/2;
                    }
                } else {
                    general_config.z_min = z_o - l_z/2;
                    general_config.z_max = z_o + l_z/2;
                }
                
                if(general_config.x_min != null && general_config.x_max != null){
                    if((x_o - l_x/2) < general_config.x_min){
                        general_config.x_min = x_o - l_x/2;
                    }
                    if((x_o + l_x/2) > general_config.x_max){
                        general_config.x_max = x_o + l_x/2;
                    }
                } else {
                    general_config.x_min = x_o - l_x/2;
                    general_config.x_max = x_o + l_x/2;
                }
                
                if(general_config.y_min != null && general_config.y_max != null){
                    if((y_o - l_y/2) < general_config.y_min){
                        general_config.y_min = y_o - l_y/2;
                    }
                    if((y_o + l_y/2) > general_config.y_max){
                        general_config.y_max = y_o + l_y/2;
                    }
                } else {
                    general_config.y_min = y_o - l_y/2;
                    general_config.y_max = y_o + l_y/2;
                }
            
                
            }
        }
    }	


    tab_temp.sort((a,b) => a-b)

    for(var m=0; m<id_sbl_array.length; m++){
        for(var j=0; j<nj; j++){
            for(var i=0; i<ni; i++){
                var index_1 = j*ni + i;
                var temp;
                var h;
                var h_w;
                switch(id_sbl_array[m]){
                    case 1:
                        temp = MesoNH_O_array[index_1].teb_1;
                        h = HCanopy[0];
                        h_w = HCanopy_w[0];
                        break;
                    case 2:
                        temp = MesoNH_O_array[index_1].teb_2;
                        h = HCanopy[1];
                        h_w = HCanopy_w[1];
                        break;
                    case 3:
                        temp = MesoNH_O_array[index_1].teb_3;
                        h = HCanopy[2];
                        h_w = HCanopy_w[2];
                        break;
                    case 4:
                        temp = MesoNH_O_array[index_1].teb_4;
                        h = HCanopy[3];
                        h_w = HCanopy_w[3];
                        break;
                    case 5:
                        temp = MesoNH_O_array[index_1].teb_5;
                        h = HCanopy[4];
                        h_w = HCanopy_w[4];
                        break;
                    case 6:
                        temp = MesoNH_O_array[index_1].teb_6;
                        h = HCanopy[5];
                        h_w = HCanopy_w[5];
                        break;
                    default:
                        return;
                }
                
                var x_u = MesoNH_U_array[index_1].x - general_config.Coord_X_paris;
                var y_u = MesoNH_U_array[index_1].y - general_config.Coord_Y_paris;
                var z_u = MesoNH_U_array[index_1].zs + h;
                
                var x_v = MesoNH_V_array[index_1].x - general_config.Coord_X_paris;
                var y_v = MesoNH_V_array[index_1].y - general_config.Coord_Y_paris;
                var z_v = MesoNH_V_array[index_1].zs + h;
                
                var z_o = MesoNH_O_array[index_1].zs + h;
                
                var l_x = (MesoNH_O_array[index_1].x - MesoNH_U_array[index_1].x)*2;
                var l_y = (MesoNH_O_array[index_1].y - MesoNH_V_array[index_1].y)*2;
                var l_z = (h-h_w)*2;
                
                var tmin = temperature_scale[0];
                var tmax = temperature_scale[1];
                var percentage_color = (temp - tmin)/(tmax - tmin);
                if(percentage_color<0){
                    percentage_color = 0;
                } else if(percentage_color >1){
                    percentage_color = 1;
                }
                
                general_config.temp_values.push(parseFloat(temp));
                var color_hex = getHCLcolor(tab_temp, temp, percentage_color,general_config.HCL_color_scales[general_config.active_HCL_id].scale);
                

                var color_rgb = hexToRgb(color_hex)
                
                var color_r = color_rgb.r/255;
                var color_g = color_rgb.g/255;
                var color_b = color_rgb.b/255;
                
                                    
                var size;
                var basic_size = 10000;
                
                if(general_config.relative_size_factor < 1){
                    var add_factor = 1-general_config.relative_size_factor;
                    if(percentage_color < 0.5){
                        size = parseInt(basic_size + basic_size*add_factor*(0.5-percentage_color)*2);
                    } else if(percentage_color == 0.5){
                        size = basic_size;
                    } else if(percentage_color > 0.5){
                        size = parseInt(basic_size - basic_size*add_factor*(percentage_color-0.5)*2);
                    }
                } else if(general_config.relative_size_factor == 1){
                    size = basic_size;
                } else if(general_config.relative_size_factor >1){
                    var add_factor = general_config.relative_size_factor-1;
                    if(percentage_color < 0.5){
                        size = parseInt(basic_size - basic_size*add_factor*(0.5-percentage_color)*2);
                    } else if(percentage_color == 0.5){
                        size = basic_size;
                    } else if(percentage_color > 0.5){
                        size = parseInt(basic_size + basic_size*add_factor*(percentage_color-0.5)*2);
                    }
                }
                            
                var number_points_offset_x = l_x/number_points;
                var number_points_offset_y = l_y/number_points;
                
                for(var a=0; a<number_points; a++){
                    for(var b=0; b<number_points; b++){
                        var pX = (x_u + a*number_points_offset_x);
                        var pY = (y_v + b*number_points_offset_y);
                        var pZ = z_o;
                        coord_array.push(pX*general_config.cst_X); 
                        coord_array.push(pZ*general_config.cst_Z);
                        coord_array.push(-pY*general_config.cst_Y);
                        colors.push(color_r);colors.push(color_g);colors.push(color_b);
                        sizes.push(size);
                        transparency_factor_array.push(general_config.transparency_factor);
                        custompercentagearray.push(percentage_color*2*Math.PI);
                        z_position_array.push((pZ - general_config.z_min)/(general_config.z_max - general_config.z_min));
                        x_position_array.push((pX - general_config.x_min)/(general_config.x_max - general_config.x_min));
                        y_position_array.push((pY - general_config.y_min)/(general_config.y_max - general_config.y_min));
                        h_position_array.push(((pZ-MesoNH_O_array[index_1].zs)-general_config.h_min)/(general_config.h_max - general_config.h_min));
                    }
                }
                    
            }
        }
    }	

    for(var m=0; m<id_meso_array.length; m++){
        for(var j=0; j<nj; j++){
            for(var i=0; i<ni; i++){
                var index_1 = j*ni + i;
                
                var temp;
                var h;
                var h_w;
                switch(id_meso_array[m]){
                    case 2:
                        temp = MesoNH_O_array[index_1].tht_2;
                        h = THAT[1];
                        h_w = THAT_W[1];
                        break;
                    case 3:
                        temp = MesoNH_O_array[index_1].tht_3;
                        h = THAT[2];
                        h_w = THAT_W[2];
                        break;
                    case 4:
                        temp = MesoNH_O_array[index_1].tht_4;
                        h = THAT[3];
                        h_w = THAT_W[3];
                        break;
                    case 5:
                        temp = MesoNH_O_array[index_1].tht_5;
                        h = THAT[4];
                        h_w = THAT_W[4];
                        break;
                    case 6:
                        temp = MesoNH_O_array[index_1].tht_6;
                        h = THAT[5];
                        h_w = THAT_W[5];
                        break;
                    case 7:
                        temp = MesoNH_O_array[index_1].tht_7;
                        h = THAT[6];
                        h_w = THAT_W[6];
                        break;
                    case 8:
                        temp = MesoNH_O_array[index_1].tht_8;
                        h = THAT[7];
                        h_w = THAT_W[7];
                        break;
                    case 9:
                        temp = MesoNH_O_array[index_1].tht_9;
                        h = THAT[8];
                        h_w = THAT_W[8];
                        break;
                    case 10:
                        temp = MesoNH_O_array[index_1].tht_10;
                        h = THAT[9];
                        h_w = THAT_W[9];
                        break;
                    case 11:
                        temp = MesoNH_O_array[index_1].tht_11;
                        h = THAT[10];
                        h_w = THAT_W[10];
                        break;
                    case 12:
                        temp = MesoNH_O_array[index_1].tht_12;
                        h = THAT[11];
                        h_w = THAT_W[11];
                        break;
                    case 13:
                        temp = MesoNH_O_array[index_1].tht_13;
                        h = THAT[12];
                        h_w = THAT_W[12];
                        break;
                    case 14:
                        temp = MesoNH_O_array[index_1].tht_14;
                        h = THAT[13];
                        h_w = THAT_W[13];
                        break;
                    case 15:
                        temp = MesoNH_O_array[index_1].tht_15;
                        h = THAT[14];
                        h_w = THAT_W[14];
                        break;
                    case 16:
                        temp = MesoNH_O_array[index_1].tht_16;
                        h = THAT[15];
                        h_w = THAT_W[15];
                        break;
                    case 17:
                        temp = MesoNH_O_array[index_1].tht_17;
                        h = THAT[16];
                        h_w = THAT_W[16];
                        break;
                    case 18:
                        temp = MesoNH_O_array[index_1].tht_18;
                        h = THAT[17];
                        h_w = THAT_W[17];
                        break;
                    case 19:
                        temp = MesoNH_O_array[index_1].tht_19;
                        h = THAT[18];
                        h_w = THAT_W[18];
                        break;
                    case 20:
                        temp = MesoNH_O_array[index_1].tht_20;
                        h = THAT[19];
                        h_w = THAT_W[19];
                        break;
                    case 21:
                        temp = MesoNH_O_array[index_1].tht_21;
                        h = THAT[20];
                        h_w = THAT_W[20];
                        break;
                    case 22:
                        temp = MesoNH_O_array[index_1].tht_22;
                        h = THAT[21];
                        h_w = THAT_W[21];
                        break;
                    case 23:
                        temp = MesoNH_O_array[index_1].tht_23;
                        h = THAT[22];
                        h_w = THAT_W[22];
                        break;
                    case 24:
                        temp = MesoNH_O_array[index_1].tht_24;
                        h = THAT[23];
                        h_w = THAT_W[23];
                        break;
                    case 25:
                        temp = MesoNH_O_array[index_1].tht_25;
                        h = THAT[24];
                        h_w = THAT_W[24];
                        break;
                    case 26:
                        temp = MesoNH_O_array[index_1].tht_26;
                        h = THAT[25];
                        h_w = THAT_W[25];
                        break;
                    case 27:
                        temp = MesoNH_O_array[index_1].tht_27;
                        h = THAT[26];
                        h_w = THAT_W[26];
                        break;
                    case 28:
                        temp = MesoNH_O_array[index_1].tht_28;
                        h = THAT[27];
                        h_w = THAT_W[27];
                        break;
                    case 29:
                        temp = MesoNH_O_array[index_1].tht_29;
                        h = THAT[28];
                        h_w = THAT_W[28];
                        break;
                    case 30:
                        temp = MesoNH_O_array[index_1].tht_30;
                        h = THAT[29];
                        h_w = THAT_W[29];
                        break;
                    case 31:
                        temp = MesoNH_O_array[index_1].tht_31;
                        h = THAT[30];
                        h_w = THAT_W[30];
                        break;
                    case 32:
                        temp = MesoNH_O_array[index_1].tht_32;
                        h = THAT[31];
                        h_w = THAT_W[31];
                        break;
                    default:
                        return;
                }
                                                
                var x_u = MesoNH_U_array[index_1].x - general_config.Coord_X_paris;
                var y_u = MesoNH_U_array[index_1].y - general_config.Coord_Y_paris;
                var z_u = MesoNH_U_array[index_1].zs + h;
                
                var x_v = MesoNH_V_array[index_1].x - general_config.Coord_X_paris;
                var y_v = MesoNH_V_array[index_1].y - general_config.Coord_Y_paris;
                var z_v = MesoNH_V_array[index_1].zs + h;
                
                var z_o = MesoNH_O_array[index_1].zs + h;
                
                var l_x = (MesoNH_O_array[index_1].x - MesoNH_U_array[index_1].x)*2;
                var l_y = (MesoNH_O_array[index_1].y - MesoNH_V_array[index_1].y)*2;
                var l_z = (h-h_w)*2;
                        
                
                var tmin = temperature_scale[0];
                var tmax = temperature_scale[1];
                var percentage_color = (temp - tmin)/(tmax - tmin);
                if(percentage_color<0){
                    percentage_color = 0;
                } else if(percentage_color >1){
                    percentage_color = 1;
                }
                
                general_config.temp_values.push(parseFloat(temp));
                var color_hex = getHCLcolor(tab_temp, temp, percentage_color,general_config.HCL_color_scales[general_config.active_HCL_id].scale);
                                         
                var color_rgb = hexToRgb(color_hex)
                
                var color_r = color_rgb.r/255;
                var color_g = color_rgb.g/255;
                var color_b = color_rgb.b/255;
                
                                    
                var size;
                var basic_size = 10000;
                
                if(general_config.relative_size_factor < 1){
                    var add_factor = 1-general_config.relative_size_factor;
                    if(percentage_color < 0.5){
                        size = parseInt(basic_size + basic_size*add_factor*(0.5-percentage_color)*2);
                    } else if(percentage_color == 0.5){
                        size = basic_size;
                    } else if(percentage_color > 0.5){
                        size = parseInt(basic_size - basic_size*add_factor*(percentage_color-0.5)*2);
                    }
                } else if(general_config.relative_size_factor == 1){
                    size = basic_size;
                } else if(general_config.relative_size_factor >1){
                    var add_factor = general_config.relative_size_factor-1;
                    if(percentage_color < 0.5){
                        size = parseInt(basic_size - basic_size*add_factor*(0.5-percentage_color)*2);
                    } else if(percentage_color == 0.5){
                        size = basic_size;
                    } else if(percentage_color > 0.5){
                        size = parseInt(basic_size + basic_size*add_factor*(percentage_color-0.5)*2);
                    }
                }
                            
                var number_points_offset_x = l_x/number_points;
                var number_points_offset_y = l_y/number_points;
                
                for(var a=0; a<number_points; a++){
                    for(var b=0; b<number_points; b++){
                        var pX = (x_u + a*number_points_offset_x);
                        var pY = (y_v + b*number_points_offset_y);
                        var pZ = z_o;
                        coord_array.push(pX*general_config.cst_X); 
                        coord_array.push(pZ*general_config.cst_Z);
                        coord_array.push(-pY*general_config.cst_Y);
                        colors.push(color_r);colors.push(color_g);colors.push(color_b);
                        sizes.push(size);
                        transparency_factor_array.push(general_config.transparency_factor);
                        custompercentagearray.push(percentage_color*2*Math.PI);
                        z_position_array.push((pZ - general_config.z_min)/(general_config.z_max - general_config.z_min));
                        x_position_array.push((pX - general_config.x_min)/(general_config.x_max - general_config.x_min));
                        y_position_array.push((pY - general_config.y_min)/(general_config.y_max - general_config.y_min));
                        h_position_array.push(((pZ-MesoNH_O_array[index_1].zs)-general_config.h_min)/(general_config.h_max - general_config.h_min));
                    }
                }
                                    
            }
        }
    }			
    
    var coord_array_32 = new Float32Array(coord_array);
    var colors_32 = new Float32Array(colors);  
    var sizes_32 = new Float32Array(sizes);
    var transparency_factor_32 = new Float32Array(transparency_factor_array);
    var custompercentage_32 = new Float32Array(custompercentagearray);
    var z_position_array_32 = new Float32Array(z_position_array);
    var x_position_array_32 = new Float32Array(x_position_array);
    var y_position_array_32 = new Float32Array(y_position_array);
    var h_position_array_32 = new Float32Array(h_position_array);
                
    
    var bufferGeometry = new THREE.BufferGeometry();
    
    bufferGeometry.setAttribute( 'position', new THREE.BufferAttribute( coord_array_32, 3 ) );
    bufferGeometry.setAttribute( 'customColor', new THREE.BufferAttribute( colors_32, 3 ) );
    bufferGeometry.setAttribute( 'customsize', new THREE.BufferAttribute(sizes_32,1));
    bufferGeometry.setAttribute( 'customtransparency', new THREE.BufferAttribute(transparency_factor_32,1));
    bufferGeometry.setAttribute( 'custompercentage', new THREE.BufferAttribute(custompercentage_32,1));
    bufferGeometry.setAttribute( 'z_position', new THREE.BufferAttribute(z_position_array_32,1));
    bufferGeometry.setAttribute( 'x_position', new THREE.BufferAttribute(x_position_array_32,1));
    bufferGeometry.setAttribute( 'y_position', new THREE.BufferAttribute(y_position_array_32,1));
    bufferGeometry.setAttribute( 'h_position', new THREE.BufferAttribute(h_position_array_32,1));
    
    let material = activate_animation()
    

    var point = new THREE.Points( bufferGeometry, material);
        
    //create_temp_histogram();	 <==== je déplace ds showPointsPlanes	
        
    grid.add(point);
    scene.add(grid);
}

export function create_regular_points_cloud(MesoNH_O_array,MesoNH_U_array,MesoNH_V_array,grid,id_sbl_array,id_meso_array,temperature_scale,THAT,THAT_W,HCanopy,HCanopy_w){

    general_config.temp_values = [];
    var ni = general_config.data_ni, 
    nj = general_config.data_nj;
    let tab_temp = [];
    var coord_array = [];
    var colors = [];
    var sizes = [];
    var transparency_factor_array = [];
    var custompercentagearray = [];
    var z_position_array = [];
    var x_position_array = [];
    var y_position_array = [];
    
    var h_position_array = [];
    
    general_config.z_min = null;
    general_config.z_max = null;
    general_config.x_min = null;
    general_config.x_max = null;
    general_config.y_min = null;
    general_config.y_max = null;
    
    general_config.h_min = null;
    general_config.h_max = null;
    
    for(var m=0; m<id_sbl_array.length; m++){
        for(var j=0; j<nj; j++){
            for(var i=0; i<ni; i++){
                var index_1 = j*ni + i;
                var h;
                var h_w;
                switch(id_sbl_array[m]){
                    case 1:
                        temp = MesoNH_O_array[index_1].teb_1;
                        h = HCanopy[0];
                        h_w = HCanopy_w[0];
                        break;
                    case 2:
                        temp = MesoNH_O_array[index_1].teb_2;
                        h = HCanopy[1];
                        h_w = HCanopy_w[1];
                        break;
                    case 3:
                        temp = MesoNH_O_array[index_1].teb_3;
                        h = HCanopy[2];
                        h_w = HCanopy_w[2];
                        break;
                    case 4:
                        temp = MesoNH_O_array[index_1].teb_4;
                        h = HCanopy[3];
                        h_w = HCanopy_w[3];
                        break;
                    case 5:
                        temp = MesoNH_O_array[index_1].teb_5;
                        h = HCanopy[4];
                        h_w = HCanopy_w[4];
                        break;
                    case 6:
                        temp = MesoNH_O_array[index_1].teb_6;
                        h = HCanopy[5];
                        h_w = HCanopy_w[5];
                        break;
                    default:
                        return;
                }
                
                tab_temp.push(parseFloat(temp))
                var x_o = MesoNH_O_array[index_1].x - general_config.Coord_X_paris;
                var y_o = MesoNH_O_array[index_1].y - general_config.Coord_Y_paris;					
                var z_o = MesoNH_O_array[index_1].zs + h;
                                
                var l_x = (MesoNH_O_array[index_1].x - MesoNH_U_array[index_1].x)*2;
                var l_y = (MesoNH_O_array[index_1].y - MesoNH_V_array[index_1].y)*2;
                var l_z = (h - h_w)*2;
                
                if(general_config.h_min != null && general_config.h_max != null){
                    if(h_w < general_config.h_min){
                        general_config.h_min = h_w;
                    }
                    if((h_w + l_z) > general_config.h_max){
                        general_config.h_max = (h_w + l_z);
                    }
                } else {
                    general_config.h_min = h_w;
                    general_config.h_max = (h_w + l_z);
                }
                
                if(general_config.z_min != null && general_config.z_max != null){
                    if((z_o - l_z/2) < general_config.z_min){
                        general_config.z_min = z_o - l_z/2;
                    }
                    if((z_o + l_z/2) > general_config.z_max){
                        general_config.z_max = z_o + l_z/2;
                    }
                } else {
                    general_config.z_min = z_o - l_z/2;
                    general_config.z_max = z_o + l_z/2;
                }
                
                if(general_config.x_min != null && general_config.x_max != null){
                    if((x_o - l_x/2) < general_config.x_min){
                        general_config.x_min = x_o - l_x/2;
                    }
                    if((x_o + l_x/2) > general_config.x_max){
                        general_config.x_max = x_o + l_x/2;
                    }
                } else {
                    general_config.x_min = x_o - l_x/2;
                    general_config.x_max = x_o + l_x/2;
                }
                
                if(general_config.y_min != null && general_config.y_max != null){
                    if((y_o - l_y/2) < general_config.y_min){
                        general_config.y_min = y_o - l_y/2;
                    }
                    if((y_o + l_y/2) > general_config.y_max){
                        general_config.y_max = y_o + l_y/2;
                    }
                } else {
                    general_config.y_min = y_o - l_y/2;
                    general_config.y_max = y_o + l_y/2;
                }
                
            }
        }
    }	
    

    for(var m=0; m<id_meso_array.length; m++){
        for(var j=0; j<nj; j++){
            for(var i=0; i<ni; i++){
                var index_1 = j*ni + i;
                
                var h;
                var h_w;
                switch(id_meso_array[m]){
                    case 2:
                        temp = MesoNH_O_array[index_1].tht_2;
                        h = THAT[1];
                        h_w = THAT_W[1];
                        break;
                    case 3:
                        temp = MesoNH_O_array[index_1].tht_3;
                        h = THAT[2];
                        h_w = THAT_W[2];
                        break;
                    case 4:
                        temp = MesoNH_O_array[index_1].tht_4;
                        h = THAT[3];
                        h_w = THAT_W[3];
                        break;
                    case 5:
                        temp = MesoNH_O_array[index_1].tht_5;
                        h = THAT[4];
                        h_w = THAT_W[4];
                        break;
                    case 6:
                        temp = MesoNH_O_array[index_1].tht_6;
                        h = THAT[5];
                        h_w = THAT_W[5];
                        break;
                    case 7:
                        temp = MesoNH_O_array[index_1].tht_7;
                        h = THAT[6];
                        h_w = THAT_W[6];
                        break;
                    case 8:
                        temp = MesoNH_O_array[index_1].tht_8;
                        h = THAT[7];
                        h_w = THAT_W[7];
                        break;
                    case 9:
                        temp = MesoNH_O_array[index_1].tht_9;
                        h = THAT[8];
                        h_w = THAT_W[8];
                        break;
                    case 10:
                        temp = MesoNH_O_array[index_1].tht_10;
                        h = THAT[9];
                        h_w = THAT_W[9];
                        break;
                    case 11:
                        temp = MesoNH_O_array[index_1].tht_11;
                        h = THAT[10];
                        h_w = THAT_W[10];
                        break;
                    case 12:
                        temp = MesoNH_O_array[index_1].tht_12;
                        h = THAT[11];
                        h_w = THAT_W[11];
                        break;
                    case 13:
                        temp = MesoNH_O_array[index_1].tht_13;
                        h = THAT[12];
                        h_w = THAT_W[12];
                        break;
                    case 14:
                        temp = MesoNH_O_array[index_1].tht_14;
                        h = THAT[13];
                        h_w = THAT_W[13];
                        break;
                    case 15:
                        temp = MesoNH_O_array[index_1].tht_15;
                        h = THAT[14];
                        h_w = THAT_W[14];
                        break;
                    case 16:
                        temp = MesoNH_O_array[index_1].tht_16;
                        h = THAT[15];
                        h_w = THAT_W[15];
                        break;
                    case 17:
                        temp = MesoNH_O_array[index_1].tht_17;
                        h = THAT[16];
                        h_w = THAT_W[16];
                        break;
                    case 18:
                        temp = MesoNH_O_array[index_1].tht_18;
                        h = THAT[17];
                        h_w = THAT_W[17];
                        break;
                    case 19:
                        temp = MesoNH_O_array[index_1].tht_19;
                        h = THAT[18];
                        h_w = THAT_W[18];
                        break;
                    case 20:
                        temp = MesoNH_O_array[index_1].tht_20;
                        h = THAT[19];
                        h_w = THAT_W[19];
                        break;
                    case 21:
                        temp = MesoNH_O_array[index_1].tht_21;
                        h = THAT[20];
                        h_w = THAT_W[20];
                        break;
                    case 22:
                        temp = MesoNH_O_array[index_1].tht_22;
                        h = THAT[21];
                        h_w = THAT_W[21];
                        break;
                    case 23:
                        temp = MesoNH_O_array[index_1].tht_23;
                        h = THAT[22];
                        h_w = THAT_W[22];
                        break;
                    case 24:
                        temp = MesoNH_O_array[index_1].tht_24;
                        h = THAT[23];
                        h_w = THAT_W[23];
                        break;
                    case 25:
                        temp = MesoNH_O_array[index_1].tht_25;
                        h = THAT[24];
                        h_w = THAT_W[24];
                        break;
                    case 26:
                        temp = MesoNH_O_array[index_1].tht_26;
                        h = THAT[25];
                        h_w = THAT_W[25];
                        break;
                    case 27:
                        temp = MesoNH_O_array[index_1].tht_27;
                        h = THAT[26];
                        h_w = THAT_W[26];
                        break;
                    case 28:
                        temp = MesoNH_O_array[index_1].tht_28;
                        h = THAT[27];
                        h_w = THAT_W[27];
                        break;
                    case 29:
                        temp = MesoNH_O_array[index_1].tht_29;
                        h = THAT[28];
                        h_w = THAT_W[28];
                        break;
                    case 30:
                        temp = MesoNH_O_array[index_1].tht_30;
                        h = THAT[29];
                        h_w = THAT_W[29];
                        break;
                    case 31:
                        temp = MesoNH_O_array[index_1].tht_31;
                        h = THAT[30];
                        h_w = THAT_W[30];
                        break;
                    case 32:
                        temp = MesoNH_O_array[index_1].tht_32;
                        h = THAT[31];
                        h_w = THAT_W[31];
                        break;
                    default:
                        return;
                }
                tab_temp.push(parseFloat(temp));
                                                
                var x_o = MesoNH_O_array[index_1].x - general_config.Coord_X_paris;
                var y_o = MesoNH_O_array[index_1].y - general_config.Coord_Y_paris;					
                var z_o = MesoNH_O_array[index_1].zs + h;
                
                var l_x = (MesoNH_O_array[index_1].x - MesoNH_U_array[index_1].x)*2;
                var l_y = (MesoNH_O_array[index_1].y - MesoNH_V_array[index_1].y)*2;
                var l_z = (h-h_w)*2;
                                
                if(general_config.h_min != null && general_config.h_max != null){
                    if(h_w < general_config.h_min){
                        general_config.h_min = h_w;
                    }
                    if((h_w + l_z) > general_config.h_max){
                        general_config.h_max = (h_w + l_z);
                    }
                } else {
                    general_config.h_min = h_w;
                    general_config.h_max = (h_w + l_z);
                }
                    
                if(general_config.z_min != null && general_config.z_max != null){
                    if((z_o - l_z/2) < general_config.z_min){
                        general_config.z_min = z_o - l_z/2;
                    }
                    if((z_o + l_z/2) > general_config.z_max){
                        general_config.z_max = z_o + l_z/2;
                    }
                } else {
                    general_config.z_min = z_o - l_z/2;
                    general_config.z_max = z_o + l_z/2;
                }
                
                if(general_config.x_min != null && general_config.x_max != null){
                    if((x_o - l_x/2) < general_config.x_min){
                        general_config.x_min = x_o - l_x/2;
                    }
                    if((x_o + l_x/2) > general_config.x_max){
                        general_config.x_max = x_o + l_x/2;
                    }
                } else {
                    general_config.x_min = x_o - l_x/2;
                    general_config.x_max = x_o + l_x/2;
                }
                
                if(general_config.y_min != null && general_config.y_max != null){
                    if((y_o - l_y/2) < general_config.y_min){
                        general_config.y_min = y_o - l_y/2;
                    }
                    if((y_o + l_y/2) > general_config.y_max){
                        general_config.y_max = y_o + l_y/2;
                    }
                } else {
                    general_config.y_min = y_o - l_y/2;
                    general_config.y_max = y_o + l_y/2;
                }
            
                
            }
        }
    }	
    
   
    tab_temp.sort((a,b) => a-b)

    for(var m=0; m<id_sbl_array.length; m++){
        for(var j=0; j<nj; j++){
            for(var i=0; i<ni; i++){
                var index_1 = j*ni + i;
                var temp;
                var h;
                var h_w;
                switch(id_sbl_array[m]){
                    case 1:
                        temp = MesoNH_O_array[index_1].teb_1;
                        h = HCanopy[0];
                        h_w = HCanopy_w[0];
                        break;
                    case 2:
                        temp = MesoNH_O_array[index_1].teb_2;
                        h = HCanopy[1];
                        h_w = HCanopy_w[1];
                        break;
                    case 3:
                        temp = MesoNH_O_array[index_1].teb_3;
                        h = HCanopy[2];
                        h_w = HCanopy_w[2];
                        break;
                    case 4:
                        temp = MesoNH_O_array[index_1].teb_4;
                        h = HCanopy[3];
                        h_w = HCanopy_w[3];
                        break;
                    case 5:
                        temp = MesoNH_O_array[index_1].teb_5;
                        h = HCanopy[4];
                        h_w = HCanopy_w[4];
                        break;
                    case 6:
                        temp = MesoNH_O_array[index_1].teb_6;
                        h = HCanopy[5];
                        h_w = HCanopy_w[5];
                        break;
                    default:
                        return;
                }
                
                
                var x_o = MesoNH_O_array[index_1].x - general_config.Coord_X_paris;
                var y_o = MesoNH_O_array[index_1].y - general_config.Coord_Y_paris;					
                var z_o = MesoNH_O_array[index_1].zs + h;
                                
                var l_x = (MesoNH_O_array[index_1].x - MesoNH_U_array[index_1].x)*2;
                var l_y = (MesoNH_O_array[index_1].y - MesoNH_V_array[index_1].y)*2;
                var l_z = (h - h_w)*2;
                
                            
                var tmin = temperature_scale[0];
                var tmax = temperature_scale[1];
                var percentage_color = (temp - tmin)/(tmax - tmin);
                if(percentage_color<0){
                    percentage_color = 0;
                } else if(percentage_color >1){
                    percentage_color = 1;
                }
                
                general_config.temp_values.push(parseFloat(temp));
                var color_hex = getHCLcolor(tab_temp, temp, percentage_color,general_config.HCL_color_scales[general_config.active_HCL_id].scale);
                
                var color_rgb = hexToRgb(color_hex)
                
                var color_r = color_rgb.r/255;
                var color_g = color_rgb.g/255;
                var color_b = color_rgb.b/255;
                    
                var cell_volume = l_x*l_y*l_z;
                
                var relative_density;
                
                if(general_config.relative_density_factor < 1){
                    var add_factor = 1-general_config.relative_density_factor;
                    if(percentage_color < 0.5){
                        relative_density = general_config.particle_density + general_config.particle_density*add_factor*(0.5-percentage_color)*2;
                    } else if(percentage_color == 0.5){
                        relative_density = general_config.particle_density;
                    } else if(percentage_color > 0.5){
                        relative_density = general_config.particle_density - general_config.particle_density*add_factor*(percentage_color-0.5)*2;
                    }
                } else if(general_config.relative_density_factor == 1){
                    relative_density = general_config.particle_density;
                } else if(general_config.relative_density_factor >1){
                    var add_factor = general_config.relative_density_factor-1;
                    if(percentage_color < 0.5){
                        relative_density = general_config.particle_density - general_config.particle_density*add_factor*(0.5-percentage_color)*2;
                    } else if(percentage_color == 0.5){
                        relative_density = general_config.particle_density;
                    } else if(percentage_color > 0.5){
                        relative_density = general_config.particle_density + general_config.particle_density*add_factor*(percentage_color-0.5)*2;
                    }
                }
                                    
                var size;
                var basic_size = 10000;
                
                if(general_config.relative_size_factor < 1){
                    var add_factor = 1-general_config.relative_size_factor;
                    if(percentage_color < 0.5){
                        size = parseInt(basic_size + basic_size*add_factor*(0.5-percentage_color)*2);
                    } else if(percentage_color == 0.5){
                        size = basic_size;
                    } else if(percentage_color > 0.5){
                        size = parseInt(basic_size - basic_size*add_factor*(percentage_color-0.5)*2);
                    }
                } else if(general_config.relative_size_factor == 1){
                    size = basic_size;
                } else if(general_config.relative_size_factor >1){
                    var add_factor = general_config.relative_size_factor-1;
                    if(percentage_color < 0.5){
                        size = parseInt(basic_size - basic_size*add_factor*(0.5-percentage_color)*2);
                    } else if(percentage_color == 0.5){
                        size = basic_size;
                    } else if(percentage_color > 0.5){
                        size = parseInt(basic_size + basic_size*add_factor*(percentage_color-0.5)*2);
                    }
                }
                    
                var particle_length_XY = parseInt(relative_density*l_x*l_y);
                
                var offset_xy = l_x/Math.sqrt(particle_length_XY);
                
                var number_particule_x = parseInt(Math.sqrt(particle_length_XY));
                var number_particule_y = parseInt(Math.sqrt(particle_length_XY));
                var number_particule_z = parseInt((l_z*general_config.cst_Z)/(offset_xy*general_config.cst_X));
                
                
                
                if(number_particule_x <1){
                number_particule_x=1;
                }
                if(number_particule_y <1){
                number_particule_y=1;
                }
                if(number_particule_z <1){
                number_particule_z=1;
                }
                var offset_z = l_z/number_particule_z;
                var counter =0;									
                for(var a=0; a<number_particule_x; a++){
                    for(var b=0; b<number_particule_y; b++){
                        for(var c=0; c<number_particule_z; c++){
                            var pX = (x_o - l_x/2 + a*offset_xy);
                            var pY = (y_o - l_y/2 + b*offset_xy);
                            var pZ = (z_o - l_z/2 + c*offset_z);
                            coord_array.push(pX*general_config.cst_X);
                            coord_array.push(pZ*general_config.cst_Z);
                            coord_array.push(-pY*general_config.cst_Y);
                            colors.push(color_r);colors.push(color_g);colors.push(color_b);
                            sizes.push(size);
                            transparency_factor_array.push(general_config.transparency_factor);
                            custompercentagearray.push(percentage_color*2*Math.PI);
                            z_position_array.push((pZ - general_config.z_min)/(general_config.z_max - general_config.z_min));
                            x_position_array.push((pX - general_config.x_min)/(general_config.x_max - general_config.x_min));
                            y_position_array.push((pY - general_config.y_min)/(general_config.y_max - general_config.y_min));
                            h_position_array.push(((pZ-MesoNH_O_array[index_1].zs)-general_config.h_min)/(general_config.h_max - general_config.h_min));
                        }
                    }
                }
                                            
            }
        }
    }	
    for(var m=0; m<id_meso_array.length; m++){
        for(var j=0; j<nj; j++){
            for(var i=0; i<ni; i++){
                var index_1 = j*ni + i;
                
                var temp;
                var h;
                var h_w;
                switch(id_meso_array[m]){
                    case 2:
                        temp = MesoNH_O_array[index_1].tht_2;
                        h = THAT[1];
                        h_w = THAT_W[1];
                        break;
                    case 3:
                        temp = MesoNH_O_array[index_1].tht_3;
                        h = THAT[2];
                        h_w = THAT_W[2];
                        break;
                    case 4:
                        temp = MesoNH_O_array[index_1].tht_4;
                        h = THAT[3];
                        h_w = THAT_W[3];
                        break;
                    case 5:
                        temp = MesoNH_O_array[index_1].tht_5;
                        h = THAT[4];
                        h_w = THAT_W[4];
                        break;
                    case 6:
                        temp = MesoNH_O_array[index_1].tht_6;
                        h = THAT[5];
                        h_w = THAT_W[5];
                        break;
                    case 7:
                        temp = MesoNH_O_array[index_1].tht_7;
                        h = THAT[6];
                        h_w = THAT_W[6];
                        break;
                    case 8:
                        temp = MesoNH_O_array[index_1].tht_8;
                        h = THAT[7];
                        h_w = THAT_W[7];
                        break;
                    case 9:
                        temp = MesoNH_O_array[index_1].tht_9;
                        h = THAT[8];
                        h_w = THAT_W[8];
                        break;
                    case 10:
                        temp = MesoNH_O_array[index_1].tht_10;
                        h = THAT[9];
                        h_w = THAT_W[9];
                        break;
                    case 11:
                        temp = MesoNH_O_array[index_1].tht_11;
                        h = THAT[10];
                        h_w = THAT_W[10];
                        break;
                    case 12:
                        temp = MesoNH_O_array[index_1].tht_12;
                        h = THAT[11];
                        h_w = THAT_W[11];
                        break;
                    case 13:
                        temp = MesoNH_O_array[index_1].tht_13;
                        h = THAT[12];
                        h_w = THAT_W[12];
                        break;
                    case 14:
                        temp = MesoNH_O_array[index_1].tht_14;
                        h = THAT[13];
                        h_w = THAT_W[13];
                        break;
                    case 15:
                        temp = MesoNH_O_array[index_1].tht_15;
                        h = THAT[14];
                        h_w = THAT_W[14];
                        break;
                    case 16:
                        temp = MesoNH_O_array[index_1].tht_16;
                        h = THAT[15];
                        h_w = THAT_W[15];
                        break;
                    case 17:
                        temp = MesoNH_O_array[index_1].tht_17;
                        h = THAT[16];
                        h_w = THAT_W[16];
                        break;
                    case 18:
                        temp = MesoNH_O_array[index_1].tht_18;
                        h = THAT[17];
                        h_w = THAT_W[17];
                        break;
                    case 19:
                        temp = MesoNH_O_array[index_1].tht_19;
                        h = THAT[18];
                        h_w = THAT_W[18];
                        break;
                    case 20:
                        temp = MesoNH_O_array[index_1].tht_20;
                        h = THAT[19];
                        h_w = THAT_W[19];
                        break;
                    case 21:
                        temp = MesoNH_O_array[index_1].tht_21;
                        h = THAT[20];
                        h_w = THAT_W[20];
                        break;
                    case 22:
                        temp = MesoNH_O_array[index_1].tht_22;
                        h = THAT[21];
                        h_w = THAT_W[21];
                        break;
                    case 23:
                        temp = MesoNH_O_array[index_1].tht_23;
                        h = THAT[22];
                        h_w = THAT_W[22];
                        break;
                    case 24:
                        temp = MesoNH_O_array[index_1].tht_24;
                        h = THAT[23];
                        h_w = THAT_W[23];
                        break;
                    case 25:
                        temp = MesoNH_O_array[index_1].tht_25;
                        h = THAT[24];
                        h_w = THAT_W[24];
                        break;
                    case 26:
                        temp = MesoNH_O_array[index_1].tht_26;
                        h = THAT[25];
                        h_w = THAT_W[25];
                        break;
                    case 27:
                        temp = MesoNH_O_array[index_1].tht_27;
                        h = THAT[26];
                        h_w = THAT_W[26];
                        break;
                    case 28:
                        temp = MesoNH_O_array[index_1].tht_28;
                        h = THAT[27];
                        h_w = THAT_W[27];
                        break;
                    case 29:
                        temp = MesoNH_O_array[index_1].tht_29;
                        h = THAT[28];
                        h_w = THAT_W[28];
                        break;
                    case 30:
                        temp = MesoNH_O_array[index_1].tht_30;
                        h = THAT[29];
                        h_w = THAT_W[29];
                        break;
                    case 31:
                        temp = MesoNH_O_array[index_1].tht_31;
                        h = THAT[30];
                        h_w = THAT_W[30];
                        break;
                    case 32:
                        temp = MesoNH_O_array[index_1].tht_32;
                        h = THAT[31];
                        h_w = THAT_W[31];
                        break;
                    default:
                        return;
                }
                                                
                var x_o = MesoNH_O_array[index_1].x - general_config.Coord_X_paris;
                var y_o = MesoNH_O_array[index_1].y - general_config.Coord_Y_paris;					
                var z_o = MesoNH_O_array[index_1].zs + h;
                
                var l_x = (MesoNH_O_array[index_1].x - MesoNH_U_array[index_1].x)*2;
                var l_y = (MesoNH_O_array[index_1].y - MesoNH_V_array[index_1].y)*2;
                var l_z = (h-h_w)*2;
                                
                                
                var tmin = temperature_scale[0];
                var tmax = temperature_scale[1];
                var percentage_color = (temp - tmin)/(tmax - tmin);
                if(percentage_color<0){
                    percentage_color = 0;
                } else if(percentage_color >1){
                    percentage_color = 1;
                }
                
                general_config.temp_values.push(parseFloat(temp));
                var color_hex = getHCLcolor(tab_temp, temp, percentage_color,general_config.HCL_color_scales[general_config.active_HCL_id].scale);
                                   
                var color_rgb = hexToRgb(color_hex)
                
                var color_r = color_rgb.r/255;
                var color_g = color_rgb.g/255;
                var color_b = color_rgb.b/255;
                    
                var cell_volume = l_x*l_y*l_z;
                
                var relative_density;
                
                if(general_config.relative_density_factor < 1){
                    var add_factor = 1-general_config.relative_density_factor;
                    if(percentage_color < 0.5){
                        relative_density = general_config.particle_density + general_config.particle_density*add_factor*(0.5-percentage_color)*2;
                    } else if(percentage_color == 0.5){
                        relative_density = general_config.particle_density;
                    } else if(percentage_color > 0.5){
                        relative_density = general_config.particle_density - general_config.particle_density*add_factor*(percentage_color-0.5)*2;
                    }
                } else if(general_config.relative_density_factor == 1){
                    relative_density = general_config.particle_density;
                } else if(general_config.relative_density_factor >1){
                    var add_factor = general_config.relative_density_factor-1;
                    if(percentage_color < 0.5){
                        relative_density = general_config.particle_density - general_config.particle_density*add_factor*(0.5-percentage_color)*2;
                    } else if(percentage_color == 0.5){
                        relative_density = general_config.particle_density;
                    } else if(percentage_color > 0.5){
                        relative_density = general_config.particle_density + general_config.particle_density*add_factor*(percentage_color-0.5)*2;
                    }
                }
                
                
                
                var size;
                var basic_size = 10000;
                
                if(general_config.relative_size_factor < 1){
                    var add_factor = 1-general_config.relative_size_factor;
                    if(percentage_color < 0.5){
                        size = parseInt(basic_size + basic_size*add_factor*(0.5-percentage_color)*2);
                    } else if(percentage_color == 0.5){
                        size = basic_size;
                    } else if(percentage_color > 0.5){
                        size = parseInt(basic_size - basic_size*add_factor*(percentage_color-0.5)*2);
                    }
                } else if(general_config.relative_size_factor == 1){
                    size = basic_size;
                } else if(general_config.relative_size_factor >1){
                    var add_factor = general_config.relative_size_factor-1;
                    if(percentage_color < 0.5){
                        size = parseInt(basic_size - basic_size*add_factor*(0.5-percentage_color)*2);
                    } else if(percentage_color == 0.5){
                        size = basic_size;
                    } else if(percentage_color > 0.5){
                        size = parseInt(basic_size + basic_size*add_factor*(percentage_color-0.5)*2);
                    }
                }
                    
                var particle_length_XY = parseInt(relative_density*l_x*l_y);
                
                var offset_xy = l_x/Math.sqrt(particle_length_XY);
                
                var number_particule_x = parseInt(Math.sqrt(particle_length_XY));
                var number_particule_y = parseInt(Math.sqrt(particle_length_XY));
                var number_particule_z = parseInt((l_z*general_config.cst_Z)/(offset_xy*general_config.cst_X));
                
                
                
                if(number_particule_x <1){
                number_particule_x=1;
                }
                if(number_particule_y <1){
                number_particule_y=1;
                }
                if(number_particule_z <1){
                number_particule_z=1;
                }
                var offset_z = l_z/number_particule_z;
                                
                for(var a=0; a<number_particule_x; a++){
                    for(var b=0; b<number_particule_y; b++){
                        for(var c=0; c<number_particule_z; c++){
                            var pX = (x_o - l_x/2 + a*offset_xy);
                            var pY = (y_o - l_y/2 + b*offset_xy);
                            var pZ = (z_o - l_z/2 + c*offset_z);
                            coord_array.push(pX*general_config.cst_X);
                            coord_array.push(pZ*general_config.cst_Z);
                            coord_array.push(-pY*general_config.cst_Y);
                            colors.push(color_r);colors.push(color_g);colors.push(color_b);
                            sizes.push(size);
                            transparency_factor_array.push(general_config.transparency_factor);
                            custompercentagearray.push(percentage_color*2*Math.PI);
                            z_position_array.push((pZ - general_config.z_min)/(general_config.z_max - general_config.z_min));
                            x_position_array.push((pX - general_config.x_min)/(general_config.x_max - general_config.x_min));
                            y_position_array.push((pY - general_config.y_min)/(general_config.y_max - general_config.y_min));
                            h_position_array.push(((pZ-MesoNH_O_array[index_1].zs)-general_config.h_min)/(general_config.h_max - general_config.h_min));
                        }
                    }
                }
                
                
                
            }
        }
    }			
                    
    var coord_array_32 = new Float32Array(coord_array);
    var colors_32 = new Float32Array(colors);  
    var sizes_32 = new Float32Array(sizes);
    var transparency_factor_32 = new Float32Array(transparency_factor_array);
    var custompercentage_32 = new Float32Array(custompercentagearray);
    var z_position_array_32 = new Float32Array(z_position_array);
    var x_position_array_32 = new Float32Array(x_position_array);
    var y_position_array_32 = new Float32Array(y_position_array);
    var h_position_array_32 = new Float32Array(h_position_array);
            
    
    var bufferGeometry = new THREE.BufferGeometry();
    
    bufferGeometry.setAttribute( 'position', new THREE.BufferAttribute( coord_array_32, 3 ) );
    bufferGeometry.setAttribute( 'customColor', new THREE.BufferAttribute( colors_32, 3 ) );
    bufferGeometry.setAttribute( 'customsize', new THREE.BufferAttribute(sizes_32,1));
    bufferGeometry.setAttribute( 'customtransparency', new THREE.BufferAttribute(transparency_factor_32,1));
    bufferGeometry.setAttribute( 'custompercentage', new THREE.BufferAttribute(custompercentage_32,1));
    bufferGeometry.setAttribute( 'z_position', new THREE.BufferAttribute(z_position_array_32,1));
    bufferGeometry.setAttribute( 'x_position', new THREE.BufferAttribute(x_position_array_32,1));
    bufferGeometry.setAttribute( 'y_position', new THREE.BufferAttribute(y_position_array_32,1));
    bufferGeometry.setAttribute( 'h_position', new THREE.BufferAttribute(h_position_array_32,1));
        
    let material = activate_animation()
        
    var point = new THREE.Points( bufferGeometry, material);

            
    grid.add(point);
    scene.add(grid);
}

export function render(){
    requestAnimationFrame( render );
    if(general_config.grid != null && general_config.is_animated == true){
        general_config.grid.children[0].material.uniforms.u_time.value += general_config.animation_speed_factor;
    }
    controls.update();
    
    renderer.render( scene, camera );
}





export function hexToRgb(hex) {
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
}

export function approximateColor1ToColor2ByPercent(color1, color2, percent) {

  var red1 = parseInt(color1[1] + color1[2], 16);
  var green1 = parseInt(color1[3] + color1[4], 16);
  var blue1 = parseInt(color1[5] + color1[6], 16);

  var red2 = parseInt(color2[1] + color2[2], 16);
  var green2 = parseInt(color2[3] + color2[4], 16);
  var blue2 = parseInt(color2[5] + color2[6], 16);

  var red = Math.round(mix(red1, red2, percent));
  var green = Math.round(mix(green1, green2, percent));
  var blue = Math.round(mix(blue1, blue2, percent));

  return generateHex(red, green, blue);
}

export function generateHex(r, g, b) {
  r = r.toString(16);
  g = g.toString(16);
  b = b.toString(16);

  while (r.length < 2) { r = "0" + r; }
  while (g.length < 2) { g = "0" + g; }
  while (b.length < 2) { b = "0" + b; }

  return "#" + r + g + b;
}

export function mix(start, end, percent) {
    return start + ((percent) * (end - start));
}

export function import_geojson(geojson_file,grid,scene,nature_type) {

var features_points_array = [];
var features_color_array = [];
var features_normal_array = [];
  for(var a =0; a< geojson_file.features.length; a++){
        var feature = geojson_file.features[a];
        
        var polygon_coordinate = [];
        
        
        var building_color;
        switch(nature_type){
            case 'typo_maj':
                building_color = return_building_color(feature.properties.typo_maj,'typo_maj');
                break;
            case 'typo_second':
                building_color = return_building_color(feature.properties.typo_second,'typo_second');
                break;
            case 'build_dens':
                building_color = return_building_color(feature.properties.build_dens,'build_dens');
                break;
            case 'hydro_dens':
                building_color = return_building_color(feature.properties.hydro_dens,'hydro_dens');
                break;
            case 'veget_dens':
                building_color = return_building_color(feature.properties.veget_dens,'veget_dens');
                break;
            case 'road_dens':
                building_color = return_building_color(feature.properties.road_dens,'road_dens');
                break;
            case 'ba':
                building_color = return_building_color(feature.properties.ba,'ba');
                break;
            case 'bgh':
                building_color = return_building_color(feature.properties.bgh,'bgh');
                break;
            case 'icif':
                building_color = return_building_color(feature.properties.icif,'icif');
                break;
            case 'icio':
                building_color = return_building_color(feature.properties.icio,'icio');
                break;
            case 'id':
                building_color = return_building_color(feature.properties.id,'id');
                break;
            case 'local':
                building_color = return_building_color(feature.properties.local,'local');
                break;
            case 'pcif':
                building_color = return_building_color(feature.properties.pcif,'pcif');
                break;
            case 'pcio':
                building_color = return_building_color(feature.properties.pcio,'pcio');
                break;
            case 'pd':
                building_color = return_building_color(feature.properties.pd,'pd');
                break;
            case 'psc':
                building_color = return_building_color(feature.properties.psc,'psc');
                break;
            case 'autre':
                building_color = return_building_color(null,'autre');
                break;
        }
        
        
        for(var j =0; j< feature.geometry.coordinates[0][0].length; j++){
            var index_1 = j;
            var index_2;
            if(j == feature.geometry.coordinates[0][0].length - 1){
                index_2 = 0;
            } else {
                index_2 = j+1;
            }
            
            polygon_coordinate.push((feature.geometry.coordinates[0][0][index_1][0]-general_config.Coord_X_paris)*general_config.cst_X);
            polygon_coordinate.push((feature.geometry.coordinates[0][0][index_1][1]-general_config.Coord_Y_paris)*general_config.cst_Y);
            
            features_points_array.push((feature.geometry.coordinates[0][0][index_1][0]-general_config.Coord_X_paris)*general_config.cst_X);features_points_array.push(feature.properties.altitude_s*general_config.cst_Z);features_points_array.push(-(feature.geometry.coordinates[0][0][index_1][1]-general_config.Coord_Y_paris)*general_config.cst_Y);
            features_points_array.push((feature.geometry.coordinates[0][0][index_1][0]-general_config.Coord_X_paris)*general_config.cst_X);features_points_array.push(feature.properties.altitude_t*general_config.cst_Z);features_points_array.push(-(feature.geometry.coordinates[0][0][index_1][1]-general_config.Coord_Y_paris)*general_config.cst_Y);
            features_points_array.push((feature.geometry.coordinates[0][0][index_2][0]-general_config.Coord_X_paris)*general_config.cst_X);features_points_array.push(feature.properties.altitude_s*general_config.cst_Z);features_points_array.push(-(feature.geometry.coordinates[0][0][index_2][1]-general_config.Coord_Y_paris)*general_config.cst_Y);
            
            features_points_array.push((feature.geometry.coordinates[0][0][index_1][0]-general_config.Coord_X_paris)*general_config.cst_X);features_points_array.push(feature.properties.altitude_t*general_config.cst_Z);features_points_array.push(-(feature.geometry.coordinates[0][0][index_1][1]-general_config.Coord_Y_paris)*general_config.cst_Y);
            features_points_array.push((feature.geometry.coordinates[0][0][index_2][0]-general_config.Coord_X_paris)*general_config.cst_X);features_points_array.push(feature.properties.altitude_t*general_config.cst_Z);features_points_array.push(-(feature.geometry.coordinates[0][0][index_2][1]-general_config.Coord_Y_paris)*general_config.cst_Y);
            features_points_array.push((feature.geometry.coordinates[0][0][index_2][0]-general_config.Coord_X_paris)*general_config.cst_X);features_points_array.push(feature.properties.altitude_s*general_config.cst_Z);features_points_array.push(-(feature.geometry.coordinates[0][0][index_2][1]-general_config.Coord_Y_paris)*general_config.cst_Y);
            
            var N_X = - (feature.properties.altitude_t*general_config.cst_Z-feature.properties.altitude_s*general_config.cst_Z)*((feature.geometry.coordinates[0][0][index_2][1]-general_config.Coord_Y_paris)*general_config.cst_Y-(feature.geometry.coordinates[0][0][index_1][1]-general_config.Coord_Y_paris)*general_config.cst_Y);
            var N_Y = (feature.properties.altitude_t*general_config.cst_Z-feature.properties.altitude_s*general_config.cst_Z)*((feature.geometry.coordinates[0][0][index_2][0]-general_config.Coord_X_paris)*general_config.cst_X-(feature.geometry.coordinates[0][0][index_1][0]-general_config.Coord_X_paris)*general_config.cst_X);
            
            var normal_vector = new THREE.Vector2( N_X, N_Y );
            normal_vector.normalize();
            
            features_normal_array.push(normal_vector.x);features_normal_array.push(0);features_normal_array.push(normal_vector.y);
            features_normal_array.push(normal_vector.x);features_normal_array.push(0);features_normal_array.push(normal_vector.y);
            features_normal_array.push(normal_vector.x);features_normal_array.push(0);features_normal_array.push(normal_vector.y);
            features_normal_array.push(normal_vector.x);features_normal_array.push(0);features_normal_array.push(normal_vector.y);
            features_normal_array.push(normal_vector.x);features_normal_array.push(0);features_normal_array.push(normal_vector.y);
            features_normal_array.push(normal_vector.x);features_normal_array.push(0);features_normal_array.push(normal_vector.y);
                                            
            features_color_array.push(building_color.r);features_color_array.push(building_color.g);features_color_array.push(building_color.b);
            features_color_array.push(building_color.r);features_color_array.push(building_color.g);features_color_array.push(building_color.b);
            features_color_array.push(building_color.r);features_color_array.push(building_color.g);features_color_array.push(building_color.b);
            features_color_array.push(building_color.r);features_color_array.push(building_color.g);features_color_array.push(building_color.b);
            features_color_array.push(building_color.r);features_color_array.push(building_color.g);features_color_array.push(building_color.b);
            features_color_array.push(building_color.r);features_color_array.push(building_color.g);features_color_array.push(building_color.b);
        }
        
        var polygon_triangulate = earcut(polygon_coordinate,null,2);
        for(var t=0; t<polygon_triangulate.length; t++){
            features_points_array.push(polygon_coordinate[polygon_triangulate[t]*2]);
            features_points_array.push(feature.properties.altitude_t*general_config.cst_Z);
            features_points_array.push(-polygon_coordinate[polygon_triangulate[t]*2 + 1]);
            
            features_color_array.push(building_color.r);features_color_array.push(building_color.g);features_color_array.push(building_color.b);
            features_normal_array.push(0);features_normal_array.push(1);features_normal_array.push(0);
        }
        for(var t=0; t<polygon_triangulate.length; t++){
            features_points_array.push(polygon_coordinate[polygon_triangulate[t]*2]);
            features_points_array.push(feature.properties.altitude_s*general_config.cst_Z);
            features_points_array.push(-polygon_coordinate[polygon_triangulate[t]*2 + 1]);
            
            features_color_array.push(building_color.r);features_color_array.push(building_color.g);features_color_array.push(building_color.b);
            features_normal_array.push(0);features_normal_array.push(1);features_normal_array.push(0);
        }
        
        
  }
  var feature_coord_array_32 = new Float32Array(features_points_array);
    var feature_colors_32 = new Float32Array(features_color_array);
    var feature_normal_32 = new Float32Array(features_normal_array);		
        
    var feature_material = new THREE.MeshPhongMaterial( { vertexColors: THREE.VertexColors, emissive: 0x072534, side: THREE.DoubleSide, flatShading: true } );
    var feature_bufferGeometry = new THREE.BufferGeometry();
    
    feature_bufferGeometry.setAttribute( 'position', new THREE.BufferAttribute( feature_coord_array_32, 3 ) );
    feature_bufferGeometry.setAttribute( 'normal', new THREE.BufferAttribute( feature_normal_32, 3 ) );
    feature_bufferGeometry.setAttribute( 'color', new THREE.BufferAttribute( feature_colors_32, 3 ) );
    var feature_mesh = new THREE.Mesh( feature_bufferGeometry, feature_material);
    
    
        
    grid.add(feature_mesh);
    scene.add(grid);
    

}

export function return_building_color(type,nature_type){
    var color_hex = '#7f7f7f';
    var color = {'r':null,'g':null,'b':null};
    if(nature_type == "typo_maj"){
        switch(type){
            case 'ba':
                color_hex = '#8f8f8f';
                break;
            case 'bgh':
                color_hex = '#000d00';
                break;
            case 'icif':
                color_hex = '#d52623';
                break;
            case 'icio':
                color_hex = '#f07923';
                break;
            case 'id':
                color_hex = '#eccb27';
                break;
            case 'local':
                color_hex = '#d728ac';
                break;
            case 'pcif':
                color_hex = '#2b6724';
                break;
            case 'pcio':
                color_hex = '#36884a';
                break;
            case 'pd':
                color_hex = '#22be2f';
                break;
            case 'psc':
                color_hex = '#05ff58';
                break;
            default:
                color_hex = '#7f7f7f';
        }
    } else if(nature_type == "typo_second"){
        switch(type){
            case 'ba':
                color_hex = '#8f8f8f';
                break;
            case 'bgh':
                color_hex = '#000d00';
                break;
            case 'icif':
                color_hex = '#d52623';
                break;
            case 'icio':
                color_hex = '#f07923';
                break;
            case 'id':
                color_hex = '#eccb27';
                break;
            case 'local':
                color_hex = '#d728ac';
                break;
            case 'pcif':
                color_hex = '#2b6724';
                break;
            case 'na':
                color_hex = '#36884a';
                break;
            case 'pd':
                color_hex = '#22be2f';
                break;
            case 'psc':
                color_hex = '#05ff58';
                break;
            default:
                color_hex = '#7f7f7f';
        }		
    } else if (nature_type == 'build_dens'){
        var color_1 = '#F6CAE5';
        var color_2 = '#94002F';
        if(type != null && type != undefined){
            color_hex = approximateColor1ToColor2ByPercent(color_1, color_2, type);
        } else {
            color_hex = '#7f7f7f';
        }	
    } else if (nature_type == 'hydro_dens'){
        var color_1 = '#7198EC';
        var color_2 = '#04065A';
        if(type != null && type != undefined){
            color_hex = approximateColor1ToColor2ByPercent(color_1, color_2, type);
        } else {
            color_hex = '#7f7f7f';
        }	
    } else if (nature_type == 'veget_dens'){
        var color_1 = '#FFF4B9';
        var color_2 = '#005F13';
        if(type != null && type != undefined){
            color_hex = approximateColor1ToColor2ByPercent(color_1, color_2, type);
        } else {
            color_hex = '#7f7f7f';
        }	
    } else if (nature_type == 'road_dens'){
        var color_1 = '#EEEEEE';
        var color_2 = '#676767';
        if(type != null && type != undefined){
            color_hex = approximateColor1ToColor2ByPercent(color_1, color_2, type);
        } else {
            color_hex = '#7f7f7f';
        }	
    } else if (nature_type == 'ba'){
        var color_1 = '#EEEEEE';
        var color_2 = '#676767';
        if(type != null && type != undefined){
            color_hex = approximateColor1ToColor2ByPercent(color_1, color_2, type/100);
        } else {
            color_hex = '#7f7f7f';
        }	
    } else if (nature_type == 'bgh'){
        var color_1 = '#EEEEEE';
        var color_2 = '#676767';
        if(type != null && type != undefined){
            color_hex = approximateColor1ToColor2ByPercent(color_1, color_2, type/100);
        } else {
            color_hex = '#7f7f7f';
        }	
    } else if (nature_type == 'icif'){
        var color_1 = '#EEEEEE';
        var color_2 = '#676767';
        if(type != null && type != undefined){
            color_hex = approximateColor1ToColor2ByPercent(color_1, color_2, type/100);
        } else {
            color_hex = '#7f7f7f';
        }	
    } else if (nature_type == 'icio'){
        var color_1 = '#EEEEEE';
        var color_2 = '#676767';
        if(type != null && type != undefined){
            color_hex = approximateColor1ToColor2ByPercent(color_1, color_2, type/100);
        } else {
            color_hex = '#7f7f7f';
        }	
    } else if (nature_type == 'id'){
        var color_1 = '#EEEEEE';
        var color_2 = '#676767';
        if(type != null && type != undefined){
            color_hex = approximateColor1ToColor2ByPercent(color_1, color_2, type/100);
        } else {
            color_hex = '#7f7f7f';
        }	
    } else if (nature_type == 'local'){
        var color_1 = '#EEEEEE';
        var color_2 = '#676767';
        if(type != null && type != undefined){
            color_hex = approximateColor1ToColor2ByPercent(color_1, color_2, type/100);
        } else {
            color_hex = '#7f7f7f';
        }	
    } else if (nature_type == 'pcif'){
        var color_1 = '#EEEEEE';
        var color_2 = '#676767';
        if(type != null && type != undefined){
            color_hex = approximateColor1ToColor2ByPercent(color_1, color_2, type/100);
        } else {
            color_hex = '#7f7f7f';
        }	
    } else if (nature_type == 'pcio'){
        var color_1 = '#EEEEEE';
        var color_2 = '#676767';
        if(type != null && type != undefined){
            color_hex = approximateColor1ToColor2ByPercent(color_1, color_2, type/100);
        } else {
            color_hex = '#7f7f7f';
        }	
    } else if (nature_type == 'pd'){
        var color_1 = '#EEEEEE';
        var color_2 = '#676767';
        if(type != null && type != undefined){
            color_hex = approximateColor1ToColor2ByPercent(color_1, color_2, type/100);
        } else {
            color_hex = '#7f7f7f';
        }	
    } else if (nature_type == 'psc'){
        var color_1 = '#EEEEEE';
        var color_2 = '#676767';
        if(type != null && type != undefined){
            color_hex = approximateColor1ToColor2ByPercent(color_1, color_2, type/100);
        } else {
            color_hex = '#7f7f7f';
        }	
    }
            
    
    var color_rgb = hexToRgb(color_hex);
                
    color.r = color_rgb.r/255;
    color.g = color_rgb.g/255;
    color.b = color_rgb.b/255;
    
    return color;
}

export function getHCLcolor(tableau, temp, percentage, HCLscale){
    let color,i;
    let tab_temp = tableau.slice(); 
    let array = [];
    let nb_arr = general_config.nb_array;
    console.log(nb_arr)
    if(general_config.active_color_class == "ecarts_egaux"){
        
        let temp_min =  general_config.temp_array[0];
        let temp_max = general_config.temp_array[1]
        let ecart = ((temp_max - temp_min) /nb_arr )
        for (i = 0; i < nb_arr; ++i) {
            //creation de n sous tableaux vides 
            array.push([]);
        }
        tab_temp.forEach(temperature => {
            for (i =0; i < array.length; ++i) {
                if(temperature >= temp_min + (ecart*i) && temperature <= temp_min + (ecart*(i+1)) ) {
                    array[i].push(temperature);
                } 
            }
        })
        //console.log(array)
        /*
         on peut 'return array' ici pour avoir le tableau composé des sous tableaux
        */
        
    } else if (general_config.active_color_class == "effectifs_egaux") {
        let nbeMaxDeVals = Math.ceil(tab_temp.length / nb_arr);
        for (i = 0; i < nb_arr; ++ i) {
            if ((tab_temp.length / (nb_arr-i)) < nbeMaxDeVals && nbeMaxDeVals > 1) {
                array.push(tab_temp.splice(0, nbeMaxDeVals-1)) 
            } else {
                array.push(tab_temp.splice(0, nbeMaxDeVals))
            }
        }
        /*
        on peut 'return array' ici pour avoir le tableau composé des sous tableaux

        */
        
        
    }
    //A adapter quand on changera les couleurs par un .png
    for (i = 0 ;  i < nb_arr; ++i) {
        if (parseFloat(temp) >= array[i][0] && parseFloat(temp) <= array[i][array[i].length-1]) {
            color = HCLscale[i];
            return color;
        }
    }
    //Ci dessous sert à renvoyer une couleur (pour ne pas que ca bugge) même si les points/plans ne seront pas représentés
    if (percentage === 1) {
        return HCLscale[nb_arr-1]
    }
    if (percentage === 0) {
        return HCLscale[0]
    }
}

export function create_temp_histogram(){
    
    var temp_deg=[];
    for(var j = 0; j<general_config.temp_values.length; j++){
        temp_deg.push(general_config.temp_values[j] - 273.15);
    }
    var margin = {top: 10, right: 40, bottom: 30, left: 30},
    width = 400 - margin.left - margin.right, 
    /* ne souhait pas mettre width ds gnl config, si on le change ici, il faut le changer dans la fonction 'chargerParams'
    où la largeur est renseignée en dur (pour le moment 330)*/
    height = 200 - margin.top - margin.bottom;
    //Pour ne pas avoir plusieurs histo a la suite, on efface et on recommence ac d'autres données
    
    $('#temp_histogram_content').html('');
    // append the svg object to the body of the page
    var svg = d3.select("#temp_histogram_content")
        .append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            //"The SVG <g> element is used to group SVG shapes together. "
        .append("g")
            .attr("transform",
                "translate(" + margin.left + "," + margin.top + ")");

        // temp minimum et maximum initiales dans l'histogramme, mais temp array est init entre 20° et 30°
        

        // X axis: scale and draw:
        var x = d3.scaleLinear()
            .domain([general_config.domain_min, general_config.domain_max])    
            .range([0, width]);
        svg.append("g")
            .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom(x));

        // set the parameters for the histogram
        var histogram = d3.histogram()            
            .value(function(d) { return d; })   // I need to give the vector of value (price est lié aux données test)
            // pour nous ca sera les temperatures
            .domain(x.domain())  // then the domain of the graphic
            .thresholds(x.ticks(general_config.domain_max-general_config.domain_min)); // then the numbers of bins

        // And apply this function to data to get the bins
        var bins = histogram(temp_deg);
       
        // Y axis: scale and draw:
        var y = d3.scaleLinear()
            .range([height, 0]);
            y.domain([0, d3.max(bins, function(d) { return d.length; })]);   // d3.hist has to be called before the Y axis obviously
        
        let yAxis = d3.axisLeft(y)
            .tickValues([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])
        svg.append("g")
            .call(yAxis);

        

        
        // append the bar rectangles to the svg element
        svg.selectAll("rect")
            .data(bins)
            .enter()
            .append("rect")
                .attr("x", 1)
                .attr("transform", function(d) { return "translate(" + x(d.x0) + "," + y(d.length) + ")"; })
                .attr("width", function(d) { return x(d.x1) - x(d.x0) -1 ; })
                .attr("height", function(d) { return height - y(d.length); })
                .attr("class", "rect_temps")
                .attr("opacity", 0.7)
                .style("fill", "#69b3a2")

        //line de temp min
        svg.append("rect")
        .attr("x", ((general_config.temp_array[0]-273.15-general_config.domain_min) / (general_config.domain_max - general_config.domain_min) * width) )
        .attr("y", 0)
        .attr("height", height)
        .attr("width", 2)
        .attr("fill", "blue")
        .attr("class", "draggables")
        .attr("id", "rect_temp_min")
        .call(d3.drag()
            .on("start", dragstarted))

        function dragstarted() {
            let line = d3.select(this).classed("dragging", true);
            d3.event.on("drag", dragged).on("end", dragended);


            function dragged() {
                line.raise()
                    .attr("x",  d3.event.x)
                    .attr("y",  0);
                
                let ecart = (borne_temp_max.x.baseVal.value - borne_temp_min.x.baseVal.value)-2;
                ecart <= (width /(general_config.domain_max-general_config.domain_min)) ? borne_temp_min.x.baseVal.value = borne_temp_max.x.baseVal.value - (width /(general_config.domain_max-general_config.domain_min)) : null;
                // vérifier qu'il ne sorte pas de width n'est pas utile puisque temp max le bloquera
                borne_temp_min.x.baseVal.value >= width ? borne_temp_min.x.baseVal.value = width : null;
                borne_temp_min.x.baseVal.value <= 0 ? borne_temp_min.x.baseVal.value = 0 : null;

                let temperatureMini = (borne_temp_min.x.baseVal.value/width)*(general_config.domain_max-general_config.domain_min)+general_config.domain_min
                
                $('#temp_min_input').val(""+temperatureMini.toFixed(2))
                general_config.temp_array = [parseFloat($("#temp_min_input").val())+273.15,parseFloat($("#temp_max_input").val())+273.15];
                
            }
            
            function dragended() {
                line.classed("dragging", false);

                recreate_scene();
            }
        }
            
        //line de temp max
        svg.append("rect")
            .attr("x", ((general_config.temp_array[1]-273.15-general_config.domain_min) / (general_config.domain_max - general_config.domain_min) * width))
            .attr("y", 0)
            .attr("height", height)
            .attr("width", 2)
            .attr("fill", "red")
            .attr("id", "rect_temp_max")
            .attr("class", "draggables")
            .call(d3.drag()
                .on("start", dragstarted2))

            function dragstarted2() {
                let line = d3.select(this).classed("dragging", true);
                d3.event.on("drag", dragged2).on("end", dragended2);


                function dragged2() {
                    line.raise()
                        .attr("x", d3.event.x)
                        .attr("y", 0);
                    let ecart = (borne_temp_max.x.baseVal.value - borne_temp_min.x.baseVal.value)-2;
                    ecart <= (width /(general_config.domain_max-general_config.domain_min)) ? borne_temp_max.x.baseVal.value = borne_temp_min.x.baseVal.value + (width /(general_config.domain_max-general_config.domain_min)) : null;
                    borne_temp_max.x.baseVal.value >= width ? borne_temp_max.x.baseVal.value = width : null;
                    // vérifier qu'il ne sorte pas côté 0 n'est pas utile puisque temp min le bloquera
                    borne_temp_max.x.baseVal.value <= 0 ? borne_temp_max.x.baseVal.value = 0 : null;

                    let temperatureMaxi = (borne_temp_max.x.baseVal.value/width)*(general_config.domain_max-general_config.domain_min)+general_config.domain_min
                    $('#temp_max_input').val(""+temperatureMaxi.toFixed(2))
                    general_config.temp_array = [parseFloat($("#temp_min_input").val())+273.15,parseFloat($("#temp_max_input").val())+273.15];
                    
                }
                
                function dragended2(d) {
                    line.classed("dragging", false);
                    
                    recreate_scene();   
                }
            }
        
            
        
        let borne_temp_min = document.querySelector('#rect_temp_min')
        let borne_temp_max = document.querySelector('#rect_temp_max')
        let minDomainMax = (borne_temp_max.x.baseVal.value/width)*(general_config.domain_max-general_config.domain_min)+general_config.domain_min;
        let maxDomainMin = (borne_temp_min.x.baseVal.value/width)*(general_config.domain_max-general_config.domain_min)+general_config.domain_min;  
        let div_inputs_flex = `<div id='domain_inputs_flex'> </div>`;
        let div_inputs_min = `<div id="div_inputs_min"></div>`;
        let div_inputs_max = `<div id="div_inputs_max"></div>`;
        let inputMin = `<input type='number' id='domain_min_input' max='${parseInt(maxDomainMin)-1}' step='1' value ='${general_config.domain_min}'/>`
        let inputMax = `<input type='number' id='domain_max_input' min='${parseInt(minDomainMax)+1}' step='1' value ='${general_config.domain_max}'/>`
        $('#temp_histogram_content').append(div_inputs_flex)
        $('#domain_inputs_flex').append(div_inputs_min)
        $('#domain_inputs_flex').append(div_inputs_max)
        $('#div_inputs_min').append(inputMin)
        $('#div_inputs_max').append(inputMax)
        $('#domain_min_input').on("change", changeDomainMin)
        function changeDomainMin() {
            
            general_config.domain_min = parseInt($('#domain_min_input').val())
            create_temp_histogram();          
        }
        $('#domain_max_input').on("change", changeDomainMax)
        function changeDomainMax() {
            
            general_config.domain_max = parseInt($('#domain_max_input').val())
            create_temp_histogram()            
        }
}

export function import_road_geojson(geojson_file,grid,scene) {

var features_points_array = [];
var features_color_array = [];
var features_normal_array = [];

var roads_height = 25;

var texture = new THREE.DataTexture3D( general_config.data_volume_3D.data_temp, general_config.data_volume_3D.x_length, general_config.data_volume_3D.y_length, general_config.data_volume_3D.z_length );
texture.format = THREE.RedFormat;
texture.type = THREE.FloatType;
texture.unpackAlignment = 1;

var texture_zs = new THREE.DataTexture( general_config.data_volume_3D.data_zs, general_config.data_volume_3D.x_length, general_config.data_volume_3D.y_length);
texture_zs.format = THREE.RedFormat;
texture_zs.type = THREE.FloatType;
texture_zs.unpackAlignment = 1;

// Colormap textures
cmtextures = {
    blue_red_2: new THREE.TextureLoader().load( 'color/blue_red_2.png', render )
};


var clim_1 = (general_config.temp_array[0] - general_config.data_volume_3D.temp_min)/(general_config.data_volume_3D.temp_max - general_config.data_volume_3D.temp_min);
var clim_2 = (general_config.temp_array[1] - general_config.data_volume_3D.temp_min)/(general_config.data_volume_3D.temp_max - general_config.data_volume_3D.temp_min);
if(clim_1 < 0){
    clim_1 = 0;
}
if(clim_1 > 1){
    clim_1 = 1;
}
if(clim_2 < 0){
    clim_2 = 0;
}
if(clim_2 > 1){
    clim_2 = 1;
}


var limit_meso_array = [1.0,2.0,4.0,6.0,9.0,13.0,47.0,60.0,132.0,218.4,322.1,446.5,595.8,775.0,989.9,1247.9,1557.5,1929.0,2374.8,2909.8,3551.8,4251.8,4951.8,5651.8,6351.8,7051.8,7751.8,8451.8,9151.8,9851.8,10551.8,11251.8,11951.8,12651.8,13351.8,14051.8,14751.8,15451.8];	
    
var road_material = new THREE.ShaderMaterial( {
                    side: THREE.DoubleSide,
                    uniforms: {
                        u_data: { value: texture },
                        zs_data: { value: texture_zs},
                        u_cmdata: { value: cmtextures.blue_red_2 },
                        u_clim: { value: [general_config.temp_array[0],general_config.temp_array[1]] },
                        u_size: { value: [general_config.data_volume_3D.x_length, general_config.data_volume_3D.y_length, general_config.data_volume_3D.z_length] },
                        x_min:{type: "f", value: 154.3850000000093},
                        x_max:{type: "f", value: 779.4010000000708},
                        y_min:{type: "f", value: 604.3519999999553},
                        y_max:{type: "f", value: 1227.0260000005364},
                        zs: {type: "f", value: 46.81231},
                        mesolimit: {value: limit_meso_array},
                        cst_X: {value: general_config.cst_X},
                        cst_Y: {value: general_config.cst_Y},
                        cst_Z: {value: general_config.cst_Z},
                    },
                    vertexShader: document.getElementById( 'vertexshader_3D_plane' ).textContent,
                    fragmentShader: document.getElementById( 'fragmentshader_3D_plane' ).textContent
                } );

    
  for(var a =0; a< geojson_file.features.length - 1; a++){
        var feature_1 = geojson_file.features[a];
        var feature_2 = geojson_file.features[a+1];
        
        if(feature_2.properties.id_road != feature_1.properties.id_road){
            continue;
        } else {
                    
        var building_color = getRoadColor(feature_1.properties.type); 
                    
        features_points_array.push((feature_1.geometry.coordinates[0]-general_config.Coord_X_paris)*general_config.cst_X);features_points_array.push(feature_1.properties.MNT*general_config.cst_Z);features_points_array.push(-(feature_1.geometry.coordinates[1]-general_config.Coord_Y_paris)*general_config.cst_Y);
        features_points_array.push((feature_1.geometry.coordinates[0]-general_config.Coord_X_paris)*general_config.cst_X);features_points_array.push((feature_1.properties.MNT + roads_height)*general_config.cst_Z);features_points_array.push(-(feature_1.geometry.coordinates[1]-general_config.Coord_Y_paris)*general_config.cst_Y);
        features_points_array.push((feature_2.geometry.coordinates[0]-general_config.Coord_X_paris)*general_config.cst_X);features_points_array.push(feature_2.properties.MNT*general_config.cst_Z);features_points_array.push(-(feature_2.geometry.coordinates[1]-general_config.Coord_Y_paris)*general_config.cst_Y);
        
        features_points_array.push((feature_1.geometry.coordinates[0]-general_config.Coord_X_paris)*general_config.cst_X);features_points_array.push((feature_1.properties.MNT + roads_height)*general_config.cst_Z);features_points_array.push(-(feature_1.geometry.coordinates[1]-general_config.Coord_Y_paris)*general_config.cst_Y);
        features_points_array.push((feature_2.geometry.coordinates[0]-general_config.Coord_X_paris)*general_config.cst_X);features_points_array.push((feature_2.properties.MNT + roads_height)*general_config.cst_Z);features_points_array.push(-(feature_2.geometry.coordinates[1]-general_config.Coord_Y_paris)*general_config.cst_Y);
        features_points_array.push((feature_2.geometry.coordinates[0]-general_config.Coord_X_paris)*general_config.cst_X);features_points_array.push(feature_2.properties.MNT*general_config.cst_Z);features_points_array.push(-(feature_2.geometry.coordinates[1]-general_config.Coord_Y_paris)*general_config.cst_Y);
        
        var N_X = - ((feature_2.properties.MNT + roads_height)*general_config.cst_Z-feature_1.properties.MNT*general_config.cst_Z)*((feature_2.geometry.coordinates[1]-general_config.Coord_Y_paris)*general_config.cst_Y-(feature_1.geometry.coordinates[1]-general_config.Coord_Y_paris)*general_config.cst_Y);
        var N_Y = ((feature_2.properties.MNT + roads_height)*general_config.cst_Z-feature_1.properties.MNT*general_config.cst_Z)*((feature_2.geometry.coordinates[0]-general_config.Coord_X_paris)*general_config.cst_X-(feature_1.geometry.coordinates[0]-general_config.Coord_X_paris)*general_config.cst_X);
        
        var normal_vector = new THREE.Vector2( N_X, N_Y );
        normal_vector.normalize();
        
        features_normal_array.push(normal_vector.x);features_normal_array.push(0);features_normal_array.push(normal_vector.y);
        features_normal_array.push(normal_vector.x);features_normal_array.push(0);features_normal_array.push(normal_vector.y);
        features_normal_array.push(normal_vector.x);features_normal_array.push(0);features_normal_array.push(normal_vector.y);
        features_normal_array.push(normal_vector.x);features_normal_array.push(0);features_normal_array.push(normal_vector.y);
        features_normal_array.push(normal_vector.x);features_normal_array.push(0);features_normal_array.push(normal_vector.y);
        features_normal_array.push(normal_vector.x);features_normal_array.push(0);features_normal_array.push(normal_vector.y);
                                        
        features_color_array.push(building_color.r);features_color_array.push(building_color.g);features_color_array.push(building_color.b);
        features_color_array.push(building_color.r);features_color_array.push(building_color.g);features_color_array.push(building_color.b);
        features_color_array.push(building_color.r);features_color_array.push(building_color.g);features_color_array.push(building_color.b);
        features_color_array.push(building_color.r);features_color_array.push(building_color.g);features_color_array.push(building_color.b);
        features_color_array.push(building_color.r);features_color_array.push(building_color.g);features_color_array.push(building_color.b);
        features_color_array.push(building_color.r);features_color_array.push(building_color.g);features_color_array.push(building_color.b);
        }
                    
        
  }
  
  var feature_coord_array_32 = new Float32Array(features_points_array);
    var feature_colors_32 = new Float32Array(features_color_array);
    var feature_normal_32 = new Float32Array(features_normal_array);		
        
    var feature_material = new THREE.MeshPhongMaterial( { vertexColors: THREE.VertexColors, emissive: 0x072534, side: THREE.DoubleSide, flatShading: true } );
    var feature_bufferGeometry = new THREE.BufferGeometry();
    
    feature_bufferGeometry.setAttribute( 'position', new THREE.BufferAttribute( feature_coord_array_32, 3 ) );
    feature_bufferGeometry.setAttribute( 'normal', new THREE.BufferAttribute( feature_normal_32, 3 ) );
    feature_bufferGeometry.setAttribute( 'color', new THREE.BufferAttribute( feature_colors_32, 3 ) );
    var feature_mesh = new THREE.Mesh( feature_bufferGeometry, road_material);
        
    general_config.grid.add(feature_mesh);
    scene.add(general_config.grid);
    

}

export function getRoadColor(type){
    var color = {"r":100, "g":100, "b":100};
    var color_hex;
    switch(type){
            case 'highway':
                color_hex = '#a71d1d';
                break;
            case 'primary':
                color_hex = '#a71d1d';
                break;
            case 'secondary':
                color_hex = '#f4ad05';
                break;
            case 'residential':
                color_hex = '#f4ad05';
                break;
            case 'tertiary':
                color_hex = '#06e270';
                break;
            case 'unclassified':
                color_hex = '#06e270';
                break;
            default:
                color_hex = '#06e270';
        }
        
    var color_rgb = hexToRgb(color_hex);
    color.r = color_rgb.r/255;
    color.g = color_rgb.g/255;
    color.b = color_rgb.b/255;
    
    return color;
}

export function create_data_texture(Meso_NH, x_length, y_length, z_length, temp_min, temp_max){
    var volume = {
        "x_length": x_length,
        "y_length": y_length,
        "z_length": z_length,
        "data": null,
        "data_temp": null,
        "data_zs": null,
        "temp_min":parseFloat(temp_min),
        "temp_max":parseFloat(temp_max)
        };
        
    var data_array = [];
    var data_array_temp = [];
    var data_zs = [];
    
    for (var t=0; t< Meso_NH.length; t++){
        data_zs.push(Meso_NH[t].zs);
    }
    
    for (var t=0; t< Meso_NH.length; t++){
        var ratio_temp = (Meso_NH[t].teb_1- temp_min)/(temp_max-temp_min);
        data_array.push(ratio_temp);
        data_array_temp.push(Meso_NH[t].teb_1);
    }
    for (var t=0; t< Meso_NH.length; t++){
        var ratio_temp = (Meso_NH[t].teb_2- temp_min)/(temp_max-temp_min);
        data_array.push(ratio_temp);
        data_array_temp.push(Meso_NH[t].teb_2);
    }
    for (var t=0; t< Meso_NH.length; t++){
        var ratio_temp = (Meso_NH[t].teb_3- temp_min)/(temp_max-temp_min);
        data_array.push(ratio_temp);
        data_array_temp.push(Meso_NH[t].teb_3);
    }
    for (var t=0; t< Meso_NH.length; t++){
        var ratio_temp = (Meso_NH[t].teb_4- temp_min)/(temp_max-temp_min);
        data_array.push(ratio_temp);
        data_array_temp.push(Meso_NH[t].teb_4);
    }
    for (var t=0; t< Meso_NH.length; t++){
        var ratio_temp = (Meso_NH[t].teb_5- temp_min)/(temp_max-temp_min);
        data_array.push(ratio_temp);
        data_array_temp.push(Meso_NH[t].teb_5);
    }
    for (var t=0; t< Meso_NH.length; t++){
        var ratio_temp = (Meso_NH[t].teb_6- temp_min)/(temp_max-temp_min);
        data_array.push(ratio_temp);
        data_array_temp.push(Meso_NH[t].teb_6);
    }
    for (var t=0; t< Meso_NH.length; t++){
        var ratio_temp = (Meso_NH[t].tht_2- temp_min)/(temp_max-temp_min);
        data_array.push(ratio_temp);
        data_array_temp.push(Meso_NH[t].tht_2);
    }
    for (var t=0; t< Meso_NH.length; t++){
        var ratio_temp = (Meso_NH[t].tht_3- temp_min)/(temp_max-temp_min);
        data_array.push(ratio_temp);
        data_array_temp.push(Meso_NH[t].tht_3);
    }
    for (var t=0; t< Meso_NH.length; t++){
        var ratio_temp = (Meso_NH[t].tht_4- temp_min)/(temp_max-temp_min);
        data_array.push(ratio_temp);
        data_array_temp.push(Meso_NH[t].tht_4);
    }
    for (var t=0; t< Meso_NH.length; t++){
        var ratio_temp = (Meso_NH[t].tht_5- temp_min)/(temp_max-temp_min);
        data_array.push(ratio_temp);
        data_array_temp.push(Meso_NH[t].tht_5);
    }
    for (var t=0; t< Meso_NH.length; t++){
        var ratio_temp = (Meso_NH[t].tht_6- temp_min)/(temp_max-temp_min);
        data_array.push(ratio_temp);
        data_array_temp.push(Meso_NH[t].tht_6);
    }
    for (var t=0; t< Meso_NH.length; t++){
        var ratio_temp = (Meso_NH[t].tht_7- temp_min)/(temp_max-temp_min);
        data_array.push(ratio_temp);
        data_array_temp.push(Meso_NH[t].tht_7);
    }
    for (var t=0; t< Meso_NH.length; t++){
        var ratio_temp = (Meso_NH[t].tht_8- temp_min)/(temp_max-temp_min);
        data_array.push(ratio_temp);
        data_array_temp.push(Meso_NH[t].tht_8);
    }
    for (var t=0; t< Meso_NH.length; t++){
        var ratio_temp = (Meso_NH[t].tht_9- temp_min)/(temp_max-temp_min);
        data_array.push(ratio_temp);
        data_array_temp.push(Meso_NH[t].tht_9);
    }
    for (var t=0; t< Meso_NH.length; t++){
        var ratio_temp = (Meso_NH[t].tht_10- temp_min)/(temp_max-temp_min);
        data_array.push(ratio_temp);
        data_array_temp.push(Meso_NH[t].tht_10);
    }
    for (var t=0; t< Meso_NH.length; t++){
        var ratio_temp = (Meso_NH[t].tht_11- temp_min)/(temp_max-temp_min);
        data_array.push(ratio_temp);
        data_array_temp.push(Meso_NH[t].tht_11);
    }
    for (var t=0; t< Meso_NH.length; t++){
        var ratio_temp = (Meso_NH[t].tht_12- temp_min)/(temp_max-temp_min);
        data_array.push(ratio_temp);
        data_array_temp.push(Meso_NH[t].tht_12);
    }
    for (var t=0; t< Meso_NH.length; t++){
        var ratio_temp = (Meso_NH[t].tht_13- temp_min)/(temp_max-temp_min);
        data_array.push(ratio_temp);
        data_array_temp.push(Meso_NH[t].tht_13);
    }
    for (var t=0; t< Meso_NH.length; t++){
        var ratio_temp = (Meso_NH[t].tht_14- temp_min)/(temp_max-temp_min);
        data_array.push(ratio_temp);
        data_array_temp.push(Meso_NH[t].tht_14);
    }
    for (var t=0; t< Meso_NH.length; t++){
        var ratio_temp = (Meso_NH[t].tht_15- temp_min)/(temp_max-temp_min);
        data_array.push(ratio_temp);
        data_array_temp.push(Meso_NH[t].tht_15);
    }
    for (var t=0; t< Meso_NH.length; t++){
        var ratio_temp = (Meso_NH[t].tht_16- temp_min)/(temp_max-temp_min);
        data_array.push(ratio_temp);
        data_array_temp.push(Meso_NH[t].tht_16);
    }
    for (var t=0; t< Meso_NH.length; t++){
        var ratio_temp = (Meso_NH[t].tht_17- temp_min)/(temp_max-temp_min);
        data_array.push(ratio_temp);
        data_array_temp.push(Meso_NH[t].tht_17);
    }
    for (var t=0; t< Meso_NH.length; t++){
        var ratio_temp = (Meso_NH[t].tht_18- temp_min)/(temp_max-temp_min);
        data_array.push(ratio_temp);
        data_array_temp.push(Meso_NH[t].tht_18);
    }
    for (var t=0; t< Meso_NH.length; t++){
        var ratio_temp = (Meso_NH[t].tht_19- temp_min)/(temp_max-temp_min);
        data_array.push(ratio_temp);
        data_array_temp.push(Meso_NH[t].tht_19);
    }
    for (var t=0; t< Meso_NH.length; t++){
        var ratio_temp = (Meso_NH[t].tht_20- temp_min)/(temp_max-temp_min);
        data_array.push(ratio_temp);
        data_array_temp.push(Meso_NH[t].tht_20);
    }
    for (var t=0; t< Meso_NH.length; t++){
        var ratio_temp = (Meso_NH[t].tht_21- temp_min)/(temp_max-temp_min);
        data_array.push(ratio_temp);
        data_array_temp.push(Meso_NH[t].tht_21);
    }
    for (var t=0; t< Meso_NH.length; t++){
        var ratio_temp = (Meso_NH[t].tht_22- temp_min)/(temp_max-temp_min);
        data_array.push(ratio_temp);
        data_array_temp.push(Meso_NH[t].tht_22);
    }
    for (var t=0; t< Meso_NH.length; t++){
        var ratio_temp = (Meso_NH[t].tht_23- temp_min)/(temp_max-temp_min);
        data_array.push(ratio_temp);
        data_array_temp.push(Meso_NH[t].tht_23);
    }
    for (var t=0; t< Meso_NH.length; t++){
        var ratio_temp = (Meso_NH[t].tht_24- temp_min)/(temp_max-temp_min);
        data_array.push(ratio_temp);
        data_array_temp.push(Meso_NH[t].tht_24);
    }
    for (var t=0; t< Meso_NH.length; t++){
        var ratio_temp = (Meso_NH[t].tht_25- temp_min)/(temp_max-temp_min);
        data_array.push(ratio_temp);
        data_array_temp.push(Meso_NH[t].tht_25);
    }
    for (var t=0; t< Meso_NH.length; t++){
        var ratio_temp = (Meso_NH[t].tht_26- temp_min)/(temp_max-temp_min);
        data_array.push(ratio_temp);
        data_array_temp.push(Meso_NH[t].tht_26);
    }
    for (var t=0; t< Meso_NH.length; t++){
        var ratio_temp = (Meso_NH[t].tht_27- temp_min)/(temp_max-temp_min);
        data_array.push(ratio_temp);
        data_array_temp.push(Meso_NH[t].tht_27);
    }
    for (var t=0; t< Meso_NH.length; t++){
        var ratio_temp = (Meso_NH[t].tht_28- temp_min)/(temp_max-temp_min);
        data_array.push(ratio_temp);
        data_array_temp.push(Meso_NH[t].tht_28);
    }
    for (var t=0; t< Meso_NH.length; t++){
        var ratio_temp = (Meso_NH[t].tht_29- temp_min)/(temp_max-temp_min);
        data_array.push(ratio_temp);
        data_array_temp.push(Meso_NH[t].tht_29);
    }
    for (var t=0; t< Meso_NH.length; t++){
        var ratio_temp = (Meso_NH[t].tht_30- temp_min)/(temp_max-temp_min);
        data_array.push(ratio_temp);
        data_array_temp.push(Meso_NH[t].tht_30);
    }
    for (var t=0; t< Meso_NH.length; t++){
        var ratio_temp = (Meso_NH[t].tht_31- temp_min)/(temp_max-temp_min);
        data_array.push(ratio_temp);
        data_array_temp.push(Meso_NH[t].tht_31);
    }
    for (var t=0; t< Meso_NH.length; t++){
        var ratio_temp = (Meso_NH[t].tht_32- temp_min)/(temp_max-temp_min);
        data_array.push(ratio_temp);
        data_array_temp.push(Meso_NH[t].tht_32);
    }
    
    var data_array_32 = new Float32Array(data_array);
    var data_array_temp_32 = new Float32Array(data_array_temp);	
    var data_zs_32 = new Float32Array(data_zs);			
    
    
    volume.data = data_array_32;
    volume.data_temp = data_array_temp_32;
    volume.data_zs = data_zs_32;
    return volume;
    
}