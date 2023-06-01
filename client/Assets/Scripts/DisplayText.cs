using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;
using TMPro;

public class DisplayText : MonoBehaviour
{
    public TMP_Text obj_text;
    public TMP_InputField display;
    void Start()
    {
        obj_text.text = PlayerPrefs.GetString("user_name");
    }

    public void Create()
    {
        obj_text.text = display.text;
        PlayerPrefs.SetString("user_name", obj_text.text);
        PlayerPrefs.Save();
    }
}
