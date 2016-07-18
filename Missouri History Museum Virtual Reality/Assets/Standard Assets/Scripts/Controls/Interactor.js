#pragma strict
import UnityEngine.UI;

public class Interactor extends RayCastHit{
	public var maxDistance : int;

	public var cursors : UnityEngine.UI.Image[];
	public var selectProgress : float;
	
	private var curDist : float;
	
	private var foundObject : boolean;
	
	function LateUpdate(){
		foundObject = false;
		
		//Checking for objects to interact with curObject
		if(curObject){
			curDist = Vector3.Distance(transform.position, hit.point);
			
			if(curObject.tag == "Triggerable" && curDist < maxDistance){
				foundObject = true;
				if(selectProgress < 1){
					Transition(true);
				}
			}
		}
		
		if(selectProgress > 0 && foundObject == false){
			Transition(false);
		}
	}
	
	function Transition(increment : boolean){
		if(increment){
			selectProgress += Time.deltaTime;
		}else{
			selectProgress -= Time.deltaTime;
		}
		
		if(selectProgress >= 1){
			curObject.SendMessage("Triggered");
		}
		
		//print("transitioning~?");
		for(var i : int; i < cursors.Length; i++){
			cursors[i].fillAmount = selectProgress;
		}
	}
}