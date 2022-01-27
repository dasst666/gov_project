import streamlit as st 
import requests 
 
if __name__ == "__main__": 
     
    option = st.selectbox('Select', ('IIN', 'BIN')) 
 
    if option == 'IIN': 
        pass
    else: 
        option = 'BIN' 
 
 
    number = st.text_input('Enter IIN/BIN') 
 
    query = f"http://0.0.0.0:8000/get_iin_bin?option={option}&iin_bin={number}" 
 
    res = requests.get(query) 
 
    st.write(res.text)