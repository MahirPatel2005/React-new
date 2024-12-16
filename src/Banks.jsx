import { useState, useEffect } from 'react';

const Bank = () => {
  const [states, setStates] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [cities, setCities] = useState([]);
  const [centers, setCenters] = useState([]);
  const [branches, setBranches] = useState([]);
  const [branchDetails, setBranchDetails] = useState(null);
  const [bankDetails, setBankDetails] = useState(null);
  const [ifscCode, setIfscCode] = useState('');

  const [selectedState, setSelectedState] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedCenter, setSelectedCenter] = useState('');
  const [selectedBranch, setSelectedBranch] = useState('');

  useEffect(() => {
    fetch('https://bank-apis.justinclicks.com/API/V1/STATE/')
      .then(response => response.json())
      .then(data => setStates(data))
      .catch(error => console.error('Error fetching states:', error));
  }, []);

  useEffect(() => {
    if (selectedState) {
      fetch(`https://bank-apis.justinclicks.com/API/V1/STATE/${selectedState}/`)
        .then(response => response.json())
        .then(data => setDistricts(data))
        .catch(error => console.error('Error fetching districts:', error));
    }
  }, [selectedState]);

  useEffect(() => {
    if (selectedDistrict) {
      fetch(`https://bank-apis.justinclicks.com/API/V1/STATE/${selectedState}/${selectedDistrict}/`)
        .then(response => response.json())
        .then(data => setCities(data))
        .catch(error => console.error('Error fetching cities:', error));
    }
  }, [selectedDistrict]);

  useEffect(() => {
    if (selectedCity) {
      fetch(`https://bank-apis.justinclicks.com/API/V1/STATE/${selectedState}/${selectedDistrict}/${selectedCity}/`)
        .then(response => response.json())
        .then(data => setCenters(data))
        .catch(error => console.error('Error fetching centers:', error));
    }
  }, [selectedCity]);

  useEffect(() => {
    if (selectedCenter) {
      fetch(`https://bank-apis.justinclicks.com/API/V1/STATE/${selectedState}/${selectedDistrict}/${selectedCity}/${selectedCenter}/`)
        .then(response => response.json())
        .then(data => setBranches(data))
        .catch(error => console.error('Error fetching branches:', error));
    }
  }, [selectedCenter]);

  useEffect(() => {
    if (selectedBranch) {
      const branchName = selectedBranch.endsWith('.json') ? selectedBranch : `${selectedBranch}.json`;
      const branchUrl = `https://bank-apis.justinclicks.com/API/V1/STATE/${selectedState}/${selectedDistrict}/${selectedCity}/${selectedCenter}/${branchName}`;

      fetch(branchUrl)
        .then(response => response.json())
        .then(data => setBranchDetails(data))
        .catch(error => console.error('Error fetching branch details:', error));
    }
  }, [selectedBranch]);

  const fetchBankDetails = () => {
    if (ifscCode.trim() !== '') {
      fetch(`https://bank-apis.justinclicks.com/API/V1/IFSC/${ifscCode}/`)
        .then(response => response.json())
        .then(data => setBankDetails(data))
        .catch(error => console.error('Error fetching bank details:', error));
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-8 px-4">
      <h1 className="text-3xl font-bold text-blue-600 mb-6">Bank Branch Finder</h1>

      {/* IFSC Code Lookup Section */}
      <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-2xl mb-8">
        <label className="block text-gray-700 font-medium mb-2">Enter IFSC Code:</label>
        <div className="flex items-center gap-4">
          <input
            type="text"
            className="border border-gray-300 rounded-md px-4 py-2 w-full focus:ring-2 focus:ring-blue-500"
            value={ifscCode}
            onChange={(e) => setIfscCode(e.target.value)}
            placeholder="Enter IFSC Code"
          />
          <button
            className="bg-blue-600 text-white font-medium px-4 py-2 rounded-md hover:bg-blue-700"
            onClick={fetchBankDetails}
          >
            Get Details
          </button>
        </div>
        {bankDetails && (
          <div className="mt-4 p-4 bg-gray-50 border border-gray-200 rounded-md">
            <h2 className="text-lg font-bold text-gray-800 mb-2">Bank Details:</h2>
            <pre className="text-sm text-gray-600 overflow-x-auto">{JSON.stringify(bankDetails, null, 2)}</pre>
          </div>
        )}
      </div>

      {/* Dropdowns */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl">
        {[{ label: 'State', value: selectedState, options: states, onChange: setSelectedState },
          { label: 'District', value: selectedDistrict, options: districts, onChange: setSelectedDistrict },
          { label: 'City', value: selectedCity, options: cities, onChange: setSelectedCity },
          { label: 'Center', value: selectedCenter, options: centers, onChange: setSelectedCenter },
          { label: 'Branch', value: selectedBranch, options: branches.map(branch => branch.replace('.json', '')), onChange: setSelectedBranch }]
          .map(({ label, value, options, onChange }, index) => (
            <div key={index} className="bg-white shadow-md rounded-lg p-6">
              <label className="block text-gray-700 font-medium mb-2">Select {label}:</label>
              <select
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-500"
                value={value}
                onChange={(e) => onChange(e.target.value)}
              >
                <option value="">Select {label}</option>
                {options.map((option, idx) => (
                  <option key={idx} value={option}>{option}</option>
                ))}
              </select>
            </div>
          ))}
      </div>

      {/* Branch Details */}
      {branchDetails && (
        <div className="mt-8 bg-white shadow-md rounded-lg p-6 w-full max-w-4xl">
          <h2 className="text-lg font-bold text-gray-800 mb-2">Branch Details:</h2>
          <pre className="text-sm text-gray-600 overflow-x-auto">{JSON.stringify(branchDetails, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default Bank;
