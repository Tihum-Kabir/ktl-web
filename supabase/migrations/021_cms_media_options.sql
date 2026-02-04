-- Add media_fit column to control object-fit CSS property
ALTER TABLE product_features 
ADD COLUMN IF NOT EXISTS media_fit text DEFAULT 'cover';

-- Add check constraint for valid values
ALTER TABLE product_features
DROP CONSTRAINT IF EXISTS valid_media_fit;

ALTER TABLE product_features
ADD CONSTRAINT valid_media_fit 
CHECK (media_fit IN ('cover', 'contain', 'fill', 'none', 'scale-down'));
