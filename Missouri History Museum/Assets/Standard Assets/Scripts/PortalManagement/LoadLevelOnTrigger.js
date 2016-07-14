#pragma strict
import UnityEngine.SceneManagement;

public var levelToLoad : String;

function OnTriggerEnter(other : Collider){
	if(other.tag == "Player"){
		Application.LoadLevelAsync(levelToLoad);
	}
}