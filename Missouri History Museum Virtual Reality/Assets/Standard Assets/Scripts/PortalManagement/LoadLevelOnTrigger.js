#pragma strict
import UnityEngine.SceneManagement;

public var levelToLoad : String;
public var loading : boolean;

private var darthFader : Fading;
private var otherLevelLoaders : GameObject[];

function Awake(){
	darthFader = FindObjectOfType(Fading);
	otherLevelLoaders = GameObject.FindGameObjectsWithTag("Triggerable");
}

function OnTriggerEnter(other : Collider){
	if(other.tag == "Player"){
		Triggered();
	}
}

function Triggered(){
	darthFader.FadeToWhite();
	loading = true;
	if(FindObjectOfType(PlayerController))
		FindObjectOfType(PlayerController).speed = 0;

	for(var i : int = 0; i < otherLevelLoaders.length; i++){
		otherLevelLoaders[i].tag = "Untagged";
	}
}

function LateUpdate(){
	if(darthFader.img.color.a == 1 && loading){
		Application.LoadLevel(levelToLoad);
	}
}