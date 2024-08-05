import React, { useState, useRef, ChangeEvent } from "react";
import "./App.css";
import axios from "axios";

const App: React.FC = () => {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };
  
  const [height, setHeight] = useState<number | ''>('');
  const [width, setWidth] = useState<number | ''>('');

  const handleHeightChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setHeight(event.target.value === '' ? '' : parseFloat(event.target.value));
  };

  const handleWidthChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setWidth(event.target.value === '' ? '' : parseFloat(event.target.value));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (height && width) {
      try {
        const response = await axios.post('https://your-backend-api.com/endpoint', {
          height,
          width
        });
        console.log('Data sent successfully:', response.data);
      } catch (error) {
        console.error('Error sending data:', error);
      }
    } else {
      alert('Please enter both height and width');
    }
  };


  return (
    <div className="App">
      <h1>Upload an Image</h1>
      <input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        ref={fileInputRef}
      />
      {imagePreview && (
        <div>
          <h2>Image Preview:</h2>
          <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="height">Height:</label>
          <input
            type="number"
            id="height"
            value={height}
            onChange={handleHeightChange}
            required
          />
        </div>
        <div>
          <label htmlFor="width">Width:</label>
          <input
            type="number"
            id="width"
            value={width}
            onChange={handleWidthChange}
            required
          />
        </div>
        <button type="submit">Submit</button>
      </form>
          
          <img src={imagePreview} alt="Image preview" />
        </div>
      )}
    </div>
  );
};

export default App;
