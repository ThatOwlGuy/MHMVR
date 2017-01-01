#pragma strict
import UnityEngine.UI;

public class Interactor extends RayCastHit{
	public var maxDistance : int;

	@SerializeField
	private var progressSpeed : float;
	@SerializeField
	private var selectProgress : float;
	
	private var curDist : float;

	private var consideredObject : GameObject;
	
	private var timeOut : float;

	function LateUpdate(){
		//print("if");
		//if there's no object don't proceed
		if(curObject == null){
			CheckVisibleIfNoObject();
			return;
		}
		
		//get out distance from the object
		var dist : float = Vector3.Distance(transform.position, curObject.transform.position);
		
		//if the object's distance is too far don't proceed
		if(dist > maxDistance){
			CheckVisibleIfNoObject();
			return;
		}
		
		//if the object is not triggerable don't proceed
		if(curObject.tag != "Triggerable"){
			CheckVisibleIfNoObject();
			return;
		}
		
		//if there is no progress, start progressing and make a reticle at the curObject
		if(selectProgress == 0){
			selectProgress = 0.01f;
			consideredObject = curObject;

			//Instantiate a LoadingBarCanvas at the object you're activating
			var lb : GameObject = Instantiate(Resources.Load("LoadingBar"), curObject.transform.position, Quaternion.identity);

			lb.GetComponent(LoadingBar).SetObject(curObject.transform);

		}else if(Time.time > timeOut){
			IncrementProgress(progressSpeed * Time.deltaTime * 0.25);
		}
	}
	
	private function CheckVisibleIfNoObject(){
		if(selectProgress == 0)
			return;
		
		ResetProgress();
	}
	
	private function IncrementProgress(thisFloat : float){
		selectProgress += thisFloat;		
		UpdateProgress();
	}
	
	private function ResetProgress(){
		selectProgress = 0;
		UpdateProgress();
	}
	
	private function UpdateProgress(){		
		if(selectProgress > 1.1){
			selectProgress = 1;
			consideredObject.SendMessage("Triggered");
			ResetProgress();
			timeOut = Time.time + 1;
		}
	}

	public function GetProgress() : float{
		return selectProgress;	
	}
}