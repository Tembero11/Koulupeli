using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;
using TMPro;
using UnityEngine.Networking;

public class DisplayText : MonoBehaviour
{
    public TMP_Text obj_text;
    public TMP_InputField display;
    public string serverURL = "http://localhost:5000"; // Replace with your server URL

    void Start()
    {
        string playerName = PlayerPrefs.GetString("user_name");
        if (!string.IsNullOrEmpty(playerName))
        {
            obj_text.text = playerName;
        }
    }

    public void Create()
    {
        string newPlayerName = display.text;
        obj_text.text = newPlayerName;
        PlayerPrefs.SetString("user_name", newPlayerName);
        PlayerPrefs.Save();

        int score = 100; // Replace with your actual score value

        StartCoroutine(SendDataToServer(newPlayerName, score));
    }

    IEnumerator SendDataToServer(string playerName, int score)
    {
        string url = $"{serverURL}/{playerName}/{score}";

        using (UnityWebRequest www = UnityWebRequest.Post(url, ""))
        {
            yield return www.SendWebRequest();

            if (www.result != UnityWebRequest.Result.Success)
            {
                Debug.LogError(www.error);
            }
            else
            {
                Debug.Log("Data sent to server successfully");
            }
        }
    }
}
