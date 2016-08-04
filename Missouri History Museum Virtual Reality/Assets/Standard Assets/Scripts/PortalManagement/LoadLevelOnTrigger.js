#pragma strict
import UnityEngine.SceneManagement;

public var levelToLoad : String;
public var loading : boolean;

private var darthFader : Fading;

function Awake(){
	darthFader = FindObjectOfType(Fading);
}

function OnTriggerEnter(other : Collider){
	if(other.tag == "Player"){
		darthFader.FadeToWhite();
		loading = true;
		FindObjectOfType(PlayerController).speed = 0;
	}
}

function LateUpdate(){
	if(darthFader.img.color.a == 1){
		Application.LoadLevel(levelToLoad);
	}
}