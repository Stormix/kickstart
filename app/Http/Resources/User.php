<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;
use App\Http\Resources\RoleCollection;

class User extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'email' => $this->email,
            '2fa'=> $this->hasTwoFactorEnabled(),
            'roles' => new RoleCollection($this->roles),
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}
