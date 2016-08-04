#pragma strict

public class ProceduralGenerator extends MonoBehaviour{
	public var range : int;
	public var player : Transform;
	
	private var lastX : int;
	private var lastZ : int;
	
	public var inArea : boolean;
	
	public var floorBlock : GameObject;
	
	function Awake(){
		player = GameObject.FindGameObjectWithTag("Player").transform as Transform;
	}
	
	function Update(){
		if(inArea){
			//simplify the position by rounding
			var px : int = Mathf.Round(player.position.x);
			var pz : int = Mathf.Round(player.position.z);
			
			//if we've moved far enough from our last position, then generate a new floor
			if(lastX != px || lastZ != pz){
					GenerateFloorCubes(px, pz);
			}
		}
	}
	
	function LateUpdate(){	
		for(var cube : Transform in transform){
			if(Vector3.Distance(player.position, cube.position) > range + 1){
				if(cube.localScale.x <= 0.1){
					Destroy(cube.gameObject);
				}else{
					cube.localScale -= Vector3(0.002, 0.002, 0.002);
				}
			}else if (cube.localScale.x <= 0.9){
				cube.localScale += Vector3(0.01, 0.01, 0.01);
			}else{
				cube.localScale = Vector3(1, 1, 1);
			}
		}
	}
	
	private function GenerateFloorCubes(px : int, pz : int){
		for(var x : int = 0; x < range; x++){
			for(var z : int = 0; z < range; z++){
				//get the current position of the next cube
				var curX : int = px + x -Mathf.Round(range/2);
				var curZ : int = pz + z -Mathf.Round(range/2);
				
				//check if there's already a cube there within all of the children of this transform
				var placeThere : boolean = true;
				for(var cube : Transform in transform){
					if(cube.position.x == curX && cube.position.z == curZ){
						placeThere = false;
					}
				}
				
				//if there isn't a cube then place a newCube there and then make it a child of this object
				if(placeThere){
					var newCube : GameObject = Instantiate(floorBlock, new Vector3(curX, 0, curZ), Quaternion.identity) as GameObject;
					newCube.transform.parent = transform;
				}
			}
		}
	}
}