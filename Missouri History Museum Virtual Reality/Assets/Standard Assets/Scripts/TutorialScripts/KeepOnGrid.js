#pragma strict

public var keptTransform : Transform;
public var sqrDistanceFromCenter : float;

private function Update() : void{
	if(keptTransform.position.x > sqrDistanceFromCenter)
		keptTransform.position.x -= sqrDistanceFromCenter * 2;

	if(keptTransform.position.x < -sqrDistanceFromCenter)
		keptTransform.position.x += sqrDistanceFromCenter * 2;

	if(keptTransform.position.z > sqrDistanceFromCenter)
		keptTransform.position.z -= sqrDistanceFromCenter * 2;

	if(keptTransform.position.z < -sqrDistanceFromCenter)
		keptTransform.position.z += sqrDistanceFromCenter * 2;
}