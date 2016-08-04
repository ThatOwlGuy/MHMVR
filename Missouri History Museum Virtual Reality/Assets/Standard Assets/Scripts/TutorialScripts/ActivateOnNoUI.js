#pragma strict

@SerializeField
private var tut : Tutorial;

@SerializeField
private var glowCube : GameObject;

public var activated : boolean;

public function LateUpdate(){
	if(activated)
		return;
	
	if(tut.out){
		activated = true;
		var player : Transform = GameObject.FindWithTag("Player").transform;
		transform.position = player.position + Vector3(3.75, 0, 5);
		glowCube.SetActive(true);
	}
}