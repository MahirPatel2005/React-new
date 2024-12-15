import React, { useEffect, useState } from 'react';

const Bank = () => {
  const [bank, setBank] = useState(null);
  const [searchIFSC, setSearchIFSC] = useState('');
  const [states, setStates] = useState([]);
  const [selectedState, setSelectedState] = useState('');
  const [districts, setDistricts] = useState([]);
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [cities, setCities] = useState([]);
  const [selectedCity, setSelectedCity] = useState('');
  const [centers, setCenters] = useState([]);

  useEffect(() => {
    fetch('https://bank-apis.justinclicks.com/API/V1/STATE/')
      .then((response) => response.json())
      .then((data) => setStates(data))
      .catch((error) => console.error('Error fetching states:', error));
  }, []);

  const fetchDistrictsByState = (state) => {
    fetch(`https://bank-apis.justinclicks.com/API/V1/STATE/${state}/`)
      .then((response) => response.json())
      .then((data) => {
        setDistricts(data);
      })
      .catch((error) => console.error('Error fetching districts:', error));
  };

  const fetchCitiesByDistrict = (state, district) => {
    fetch(`https://bank-apis.justinclicks.com/API/V1/STATE/${state}/${district}/`)
      .then((response) => response.json())
      .then((data) => {
        setCities(data);
      })
      .catch((error) => console.error('Error fetching cities:', error));
  };

  const fetchCentersByLocation = (state, district, city) => {
    fetch(`https://bank-apis.justinclicks.com/API/V1/STATE/${state}/${district}/${city}/`)
      .then((response) => response.json())
      .then((data) => {
        setCenters(data);
      })
      .catch((error) => console.error('Error fetching centers:', error));
  };

  const handleStateChange = (event) => {
    const state = event.target.value;
    setSelectedState(state);
    setSelectedDistrict(''); // Reset district and city when state changes
    setSelectedCity('');
    fetchDistrictsByState(state);
  };

  const handleDistrictChange = (event) => {
    const district = event.target.value;
    setSelectedDistrict(district);
    setSelectedCity(''); // Reset city when district changes
    fetchCitiesByDistrict(selectedState, district);
  };

  const handleCityChange = (event) => {
    const city = event.target.value;
    setSelectedCity(city);
    fetchCentersByLocation(selectedState, selectedDistrict, city);
  };

  const fetchBankByIFSC = (ifsc) => {
    fetch(`https://bank-apis.justinclicks.com/API/V1/IFSC/${ifsc}/`)
      .then((response) => response.json())
      .then((data) => setBank(data))
      .catch((error) => console.error('Error fetching bank data:', error));
  };

  const handleSearch = () => {
    if (searchIFSC) {
      fetchBankByIFSC(searchIFSC);
    }
  };

  const handleCenterClick = (center) => {
    const centerName = center.CENTRE_NAME; // Assuming the center object has a property CENTRE_NAME
    const url = `https://bank-apis.justinclicks.com/API/V1/STATE/${selectedState}/${selectedDistrict}/${selectedCity}/${centerName}/`;
    
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setBank(data); // Assuming the response contains bank details
      })
      .catch((error) => console.error('Error fetching center details:', error));
  };

  return (
    <div>
      <h2>Search for a Bank</h2>
      <input 
        type="text" 
        placeholder="Search by IFSC" 
        value={searchIFSC} 
        onChange={(e) => setSearchIFSC(e.target.value)} 
      />
      <button onClick={handleSearch}>Search</button>

      <h3>Or Search by Location</h3>
      <select onChange={handleStateChange} value={selectedState}>
        <option value="">Select State</option>
        {states.map((state) => (
          <option key={state} value={state}>{state}</option>
        ))}
      </select>
      <select onChange={handleDistrictChange} value={selectedDistrict}>
        <option value="">Select District</option>
        {districts.map((district) => (
          <option key={district} value={district}>{district}</option>
        ))}
      </select>
      <select onChange={handleCityChange} value={selectedCity}>
        <option value="">Select City</option>
        {cities.map((city) => (
          <option key={city} value={city}>{city}</option>
        ))}
      </select>

      {centers.length > 0 && (
        <div>
          <h3>Centers:</h3>
          <ul>
            {centers.map((center) => (
              <li key={center.IFSC} onClick={() => handleCenterClick(center)}>
                {center.BANK} - {center.BRANCH}
              </li>
            ))}
          </ul>
        </div>
      )}

      {bank && (
        <div>
          <h3 style={{ fontSize: '24px' }}><b>Bank Details:</b></h3>
          <p><strong>Bank:</strong> {bank.BANK}</p>
          <p><strong>Branch:</strong> {bank.BRANCH}</p>
          <p><strong>Address:</strong> {bank.ADDRESS}</p>
          <p><strong>City:</strong> {bank.CITY}</p>
          <p><strong>District:</strong> {bank.DISTRICT}</p>
          <p><strong>State:</strong> {bank.STATE}</p>
          <p><strong>IFSC:</strong> {bank.IFSC}</p>
          <p><strong>MICR:</strong> {bank.MICR}</p>
          <p><strong>Contact:</strong> {bank.CONTACT}</p>
          <p><strong>IMPS:</strong> {bank.IMPS ? 'Yes' : 'No'}</p>
          <p><strong>NEFT:</strong> {bank.NEFT ? 'Yes' : 'No'}</p>
          <p><strong>RTGS:</strong> {bank.RTGS ? 'Yes' : 'No'}</p>
          <p><strong>UPI:</strong> {bank.UPI ? 'Yes' : 'No'}</p>
        </div>
      )}
    </div>
  );
};

export default Bank;