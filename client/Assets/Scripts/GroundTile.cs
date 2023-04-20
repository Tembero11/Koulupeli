using UnityEngine;

public class GroundTile : MonoBehaviour
{
    GroundSpawner groundSpawner;
    private void Start()
    {
        groundSpawner = GameObject.FindObjectOfType<GroundSpawner>();
        SpawnObstacle();
    }

    // Tuhoo tilet 2 sekunttia sen j‰lkeen kun sit‰ on l‰p‰isty
    private void OnTriggerExit(Collider other)
    {
        groundSpawner.SpawnTile();
        Destroy(gameObject, 2);
    }

    private void Update()
    {
        
    }

    public GameObject obstaclePrefab;
    

    void SpawnObstacle()
    {
        // Valitse random paikka minne spawnaa este
        int obstacleSpawnIndex = Random.Range(2, 5);
        Transform spawnPoint = transform.GetChild(obstacleSpawnIndex).transform;
        //obstaclePrefab.transform.Rotate (new Vector3(90, 0, 0));
        // Spawnaa este m‰‰r‰ttyyn paikkaan
        Instantiate(obstaclePrefab, spawnPoint.position, Quaternion.identity, transform);
    }
}
