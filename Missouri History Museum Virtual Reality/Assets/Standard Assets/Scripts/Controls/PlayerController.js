#pragma strict

@script RequireComponent(Rigidbody)
@script RequireComponent(CapsuleCollider)
@script RequireComponent(AudioSource)

public class PlayerController extends MonoBehaviour{
	
	private var th : TouchHandler;
	
	//private var osvrEnabled : boolean;
	private var head : Transform;
	
	public var isGrounded : boolean;
	public var isMoving : boolean;
	public var speed : float;
	//public var jumpSpeed : float;
	
	public var stepInterval : float;
	private var stepTimeOut : float;

	public var footStepSounds : AudioClip[];
	//public var jumpSound : AudioClip;
	public var landSound : AudioClip;
	
	private var rig : Rigidbody;
	private var aud : AudioSource;
	
	private var groundDist : float;
	
	function Start(){
		th = FindObjectOfType(TouchHandler);
		
		rig = GetComponent(Rigidbody);
		groundDist = (GetComponent(CapsuleCollider).height / 2) + 0.05;
		head = GameObject.Find("Main Camera").transform;
		aud = GetComponent(AudioSource);
		
		//osvrEnabled = FindObjectOfType(VRManagement).GetActive();
	}
	
	function LateUpdate(){
		if(!isGrounded){
			CheckForGround();
		}
	}
	
	private function CheckForGround(){
		
		var hit : RaycastHit;
		var ray = new Ray(transform.position, Vector3.down);

		if(Physics.Raycast(ray,  hit)){
			if(Vector3.Distance(transform.position, hit.point) < groundDist){
				if(!isGrounded){
					aud.clip = landSound;
					aud.Play();
				}
				isGrounded = true;
			}else{
				isGrounded = false;
			}
		}
	}
	
	function Update(){
		if(!isGrounded){
			return;
		}
		
		if(th.curTouch == TouchHandler.TouchType.Hold){
			isMoving = true;
		}else if(th.curTouch == TouchHandler.TouchType.Tap || th.curTouch == TouchHandler.TouchType.DoubleTap){
			isMoving = !isMoving;
		}
		
		if(isMoving){
			Movement();
		}
	}
	
	function Movement(){
		//print("moving?");
		
		var horizontalVelocity : Vector3;
		
		if(th.curTouch == TouchHandler.TouchType.Hold){
			horizontalVelocity = -Vector3.forward/2;
		}else{
			horizontalVelocity = Vector3.forward;
		}
		horizontalVelocity = head.TransformDirection(horizontalVelocity);
		horizontalVelocity.y = 0.0;
		
		horizontalVelocity *= Mathf.Lerp(0, speed, Time.deltaTime * Mathf.Lerp(0, 25, Time.time));
		
		var verticalVelocity : Vector3;
		verticalVelocity = Vector3(0, rig.velocity.y, 0);
		
		var targetVelocity : Vector3;
		targetVelocity = horizontalVelocity + verticalVelocity;
		
		if(Time.time >= stepTimeOut){
			StepNoise();
			//print("Step?");
		}
		
		rig.velocity = targetVelocity;
	}
	
	function StepNoise(){
		if(isMoving){
			stepTimeOut = Time.time + stepInterval;
		}
		
		var i : int = Random.Range(0, 3);
		
		aud.clip = footStepSounds[i];
		
		aud.Play();
	}
	
	function OnCollisionEnter(other : Collision){
		//print("Collided!");
		var hit : RaycastHit;
		var ray;
		
		for(var contact : ContactPoint in other.contacts){
			ray = new Ray(contact.point, Vector3.down);
			//print("contactRay");
			if(Physics.Raycast(ray,  hit)){
				//print( hit.distance );
				if(hit.distance < 0.15){
					isGrounded = true;
				}else if(rig.velocity.y <= 0.5){
					isGrounded = true;
				}
			}
		}
	}
	
	
	function OnCollisionExit(other : Collision){
		//print("OnCollisionExit");
		CheckForGround();
	}
}
