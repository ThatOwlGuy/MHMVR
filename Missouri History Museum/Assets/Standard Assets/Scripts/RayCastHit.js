#pragma strict

public var curObject : GameObject;
public var eye : Transform;

protected var hit : RaycastHit;

private var curPoint : Vector3;

function Awake(){
	var i : int = 0;
	eye = GameObject.Find("VREye0").transform;
}

function Update () {
	if (eye == null){return;}
	
	//print(" RAYCASTHITUPDATEISRUNNING!");

	var ray = new Ray(eye.transform.position, eye.transform.forward);
	
	if (Physics.Raycast(ray, hit)) {
		Debug.DrawRay(eye.transform.position, eye.transform.forward * 10, Color.green);
		curPoint = hit.point;

		if (hit.collider.gameObject != curObject || curObject == null)
			curObject = hit.collider.gameObject;
	}else {
		curObject = null;
	}
}

public function GetPoint(){
	if (curObject == null || curPoint == null){
		return null;
	}
	
	//print(curObject.name);
	
	return curPoint;
}